import React from "react";
import { Card } from "components";
import { Box } from "@mui/material";

import { routes } from "configs";

const TemplateMain = () => {
  const cardsData = [
    {
      title: "Job description template",
      //   quantity: 0,
      link: routes.jobDescriptionTemplate,
    },
    {
      title: "Company description template",
      //   quantity: 0,
      link: routes.jobDescriptionTemplate,
    },
  ];
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "1.25rem -0.75rem",
        }}
      >
        {cardsData.map((card) => (
          <Box
            key={card.title}
            sx={{
              width: {
                xs: "50%",
                md: "33.33%",
              },
              marginBottom: "1.25rem",
              padding: "0 0.75rem",
            }}
          >
            <Card data={card} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default TemplateMain;
