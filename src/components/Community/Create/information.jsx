import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextField } from "components";
import JoditEditor from "jodit-react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";

const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
}));

const CreateCommunityInformations = ({ community, setCommunity }) => {
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);
  const appendLog = useCallback(
    (message) => {
      setCommunity({
        ...community,
        content: message,
      });
    },
    [logs, setLogs, community]
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
      },
      theme: "dark",
      uploader: {
        insertImageAsBase64URI: false,
        imagesExtensions: ["jpg", "png", "jpeg", "gif"],
        withCredentials: false,
        format: "json",
        method: "POST",
        url: "http://localhost:8000/api/v3/communication-images/image",
        // headers: {
        //   "Content-Type": `multipart/form-data`,
        // },
        prepareData: function (formData) {
          // console.log(formData.getAll());
          console.log(formData.get("file[0]"));
          const file = formData.getAll("files[0]")[0];
          formData.append("image", file);
          return formData;
        },
        isSuccess: function (resp) {
          console.log("isSuccess", resp);
          return !resp.error;
        },
        getMsg: function (resp) {
          return resp.msg.join !== undefined ? resp.msg.join(" ") : resp.msg;
        },
        process: function (resp) {
          console.log("process", resp);
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
          this.events.fire("errorPopap", this.i18n(resp.msg));
        },
      },
    }),
    []
  );

  const onChange = () => (
    (newContent) => {
      appendLog(`${newContent}`);
      setCommunity(newContent);
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
    <Grid container spacing={4}>
      {/* Title */}
      <Grid item xs={12} lg={12}>
        <Item>
          <TextField
            label="Tiêu đề"
            variant="outlined"
            value={community.title}
            onChange={(e) => {
              setCommunity((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }}
            fullWidth
          />
        </Item>
      </Grid>

      {/* <Grid item xs={12} lg={12}>
        <Item>
          <TextField
            label="Nội dung"
            variant="outlined"
            value={community.content}
            multiline
            rows={4}
            onChange={(e) => {
              setCommunity((prevState) => ({
                ...prevState,
                content: e.target.value,
              }));
            }}
            size="large"
          />
        </Item>
      </Grid> */}

      <Grid item xs={12} lg={12}>
        <JoditEditor
          value={community.content}
          config={config}
          tabIndex={1}
          onBlur={onBlur}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default CreateCommunityInformations;
