import { axios } from "configs";
import React, { useEffect, useState } from "react";
import { companyStatus } from "constant/statusCompany";

import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Chip,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import TablePostsCompany from "components/Table/TablePostsCompany";
import postsCompanyListColumn from "configs/table/postCompanyListColumn";

const CompanyDetail = () => {
  const { id } = useParams();
  const theme = useTheme();

  const [company, setCompany] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`/v3/companies/${id}`);
        setCompany(data.data);
      } catch (error) {
        throw error;
      }
    })();
  }, [id, isLoad]);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`/v3/posts/company/${id}`);
        setPosts(data.data.posts);
      } catch (error) {
        throw error;
      }
    })();
  }, [id, company]);

  if (!company) {
    return;
  }

  const infoCompany = [
    {
      title: "Tax Code",
      content: company?.taxCode,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Address",
      content: `${company?.companyLocation?.fullName}, ${company?.companyLocation?.district?.fullName}, ${company?.companyLocation?.district?.province?.fullName}`,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Email",
      content: company?.email,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Phone",
      content: company?.phone,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Website",
      content: company?.website,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Category",
      content: company?.companyCategory.fullName,
      notInfo: " Company information not updated yet",
    },
    {
      title: "Company size",
      content: company?.companySizeInfomation?.nameText,
      notInfo: " Company information not updated yet",
    },
  ];

  const handleUpdateStatus = async (status) => {
    try {
      await axios.put(`/v3/companies/${id}/status`, { status });
      toast.success("Successfully updated status");
      setIsLoad(!isLoad);
    } catch (error) {
      throw error;
    }
  };
  console.log(posts);
  return (
    <>
      <Box color={theme.palette.color.main} margin={3}>
        <Typography variant="h1">Company's information</Typography>

        <Box mt={3}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
            mb={3}
          >
            <Box sx={{ display: "flex" }} gap={3}>
              <Box
                sx={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={company.logoPath}
                  alt={company.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box>
                <Typography variant="h3">{company.name}</Typography>
              </Box>
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography variant="h3">Status</Typography>
                  {company.status ? (
                    <Chip label="Accepted" color="success" variant="outlined" />
                  ) : (
                    <Chip variant="outlined" color="primary" label="Pending" />
                  )}
                </Box>
                {company.status ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdateStatus(companyStatus.block)}
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdateStatus(companyStatus.accept)}
                  >
                    Accept
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          {/* Description */}
          <Box mb={3}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Description
            </Typography>
            <Typography variant="body2">{company.description}</Typography>
          </Box>
          {/* Info */}
          <Box mb={3}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Basic information
            </Typography>
            <Box>
              <ul>
                {infoCompany.map((info) => (
                  <li key={info.title}>
                    <Box>
                      <Typography variant="body2">
                        {info.title}:{" "}
                        <Typography
                          variant="caption"
                          display="inline"
                          marginLeft={1}
                        >
                          {info.content ? info.content : info.notInfo}
                        </Typography>
                      </Typography>
                    </Box>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          {/* Image */}
          <Box mb={3}>
            <Typography variant="h3" gutterBottom fontWeight={600}>
              Company's image
            </Typography>
            {company.images.length > 0 ? (
              <ImageList
                sx={{ width: "100%", height: 176 }}
                cols={5}
                rowHeight={100}
              >
                {company.images.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={item.imagePath}
                      alt={company.name}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography variant="body2" gutterBottom fontWeight={600}>
                Company information not updated yet
              </Typography>
            )}
          </Box>
          {/* Post */}
        </Box>
        <Box sx={{ height: "500px" }}>
          <Typography variant="h3" gutterBottom fontWeight={600}>
            Company's post
          </Typography>
          {posts.length > 0 ? (
            <TablePostsCompany rows={posts} columns={postsCompanyListColumn} />
          ) : (
            <Typography variant="body2" gutterBottom fontWeight={600}>
              Company not updated post yet
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CompanyDetail;
