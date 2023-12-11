import { memo } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import JoditEditor from "jodit-react";
import { useMemo, useCallback, useState } from "react";

import { TextField } from "components";
const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
}));

const BasicInformation = ({ basicInformation, setBasicInformation }) => {
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);
  const appendLog = useCallback(
    (message) => {
      setBasicInformation({
        ...basicInformation,
        content: message,
      });
    },
    [logs, setLogs]
  );
  const config = useMemo(
    () => ({
      readonly: false,
      minHeight: 600,
      toolbar: true,
      spellcheck: false,
      toolbarAdaptive: false,
      toolbarSticky: false,
      toolbarButtonSize: "large",
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      askBeforePasteFromExcel: false,
      askBeforePaste: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      showPlaceholder: false,
      showWordsCounterInFooter: false,
      showCharsCounterInFooter: false,
      showTooltip: true,
      showTooltipDelay: 0,
      showTooltipOnSelection: false,
      style: {
        background: "#0a1929",
        color: "#ffff",
        padding: "20px",
      },
      theme: "dark",
      uploader: {
        insertImageAsBase64URI: false,
        imagesExtensions: ["jpg", "png", "jpeg", "gif"],
        withCredentials: false,
        format: "json",
        method: "POST",
        url: "https://aiworks.vn/api/v3/communication-images/image",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
        },
        // prepareData: function (formData) {
        //   return formData;
        // },
        isSuccess: function (resp) {
          return resp;
        },
        getMsg: function (resp) {
          return resp.message.join !== undefined
            ? resp.message.join(" ")
            : resp.message;
        },
        process: function (resp) {
          return {
            files: [resp.data],
            path: "",
            baseurl: "",
            error: resp.error ? 1 : 0,
            msg: resp.msg,
          };
        },
        defaultHandlerSuccess: function (data, resp) {
          const files = data.files || [];
          if (files.length) {
            this.selection.insertImage(files[0], null, 250);
          }
        },
        defaultHandlerError: function (resp) {
          this.events.fire("error", this.i18n(resp.message));
        },
      },
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(`${newContent}`);
    },
    [appendLog]
  );

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`${newContent}`);
    },
    [appendLog, setContent]
  );

  return (
    basicInformation && (
      <Grid container spacing={4}>
        {/* Id */}

        {/* <Grid item xs={12} lg={6}>
          <Item>
            <TextField
              label="Account_id"
              variant="outlined"
              value={basicInformation.account_id || "1"}
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => {}}
              fullWidth
            />
          </Item>
        </Grid> */}

        <Grid item xs={12} lg={6}>
          <Item>
            <TextField
              label="ID"
              variant="outlined"
              value={basicInformation.id || "1"}
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => {}}
              fullWidth
            />
          </Item>
        </Grid>

        {/* Created at */}
        <Grid item xs={12} lg={6}>
          <Item>
            <TextField
              label="Ngày tạo"
              variant="outlined"
              value={
                moment(basicInformation.created_at).format(
                  "DD/MM/YYYY HH:mm:ss"
                ) || ""
              }
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => {}}
              fullWidth
            />
          </Item>
        </Grid>

        {/* Title */}
        <Grid item xs={12} lg={12}>
          <Item>
            <TextField
              label="Tiêu đề"
              variant="outlined"
              value={basicInformation.title || "1"}
              onChange={(e) => {
                setBasicInformation((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              fullWidth
            />
          </Item>
        </Grid>

        {/* URL */}
        {/* <Grid item xs={12} lg={12}>
          <Item>
            <TextField
              label="Nội dung bài đăng"
              variant="outlined"
              multiline
              rows={6}
              value={basicInformation.content || ""}
              onChange={(e) => {
                setBasicInformation((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }));
              }}
              fullWidth
            />
          </Item>
        </Grid> */}

        <Grid item xs={12} lg={12}>
          <JoditEditor
            value={basicInformation.content}
            config={config}
            tabIndex={1}
            onBlur={onBlur}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    )
  );
};

export default memo(BasicInformation);
