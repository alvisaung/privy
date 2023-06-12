import { CloudUpload, ImageAspectRatioRounded } from "@mui/icons-material";
import { Box, Button, Icon, IconButton, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC, SetStateAction, useState } from "react";
import { MenuPic } from "@/services/types/general";

interface MenuImgProps {
  menuImgs: MenuPic[];
  setMenuImgs: (menuImg: MenuPic[]) => void;
}

const MenuImgUpload: FC<MenuImgProps> = ({ menuImgs, setMenuImgs }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const added_file = event.target.files[0];
      const add_img = { file: added_file, pic_desc: added_file.name, url: "" };
      // url: string;
      // pic_desc: string;
      setMenuImgs([...menuImgs, add_img]);
    }
  };
  const handleClear = (idx: number) => {
    let new_files = [...menuImgs];
    new_files.splice(idx, 1);
    setMenuImgs(new_files);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number) => {
    const name = e.target.value;
    let new_files = [...menuImgs];
    new_files[idx].pic_desc = name;
    setMenuImgs(new_files);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Upload Menu Picture
      </Typography>
      <input type="file" accept="image/*" id="image-upload-button" style={{ display: "none" }} onChange={handleFileSelect} />

      <label htmlFor="image-upload-button">
        <Button component="span" sx={{ pr: 2, pl: 2, flexDirection: "column" }} variant="outlined">
          <CloudUpload />
          <Typography sx={{ display: "block" }}>Upload Menu</Typography>
        </Button>
      </label>

      <Box display={"flex"} flexWrap={"wrap"} sx={{ mt: 2 }}>
        {menuImgs.length > 0 &&
          menuImgs.map((preview, idx) => (
            <Stack key={idx} sx={{ alignItems: "center", mr: { xs: 0, sm: 2 }, width: { xs: "100%", sm: "40%" } }}>
              {/* URL.createObjectURL(preview.file) */}
              <img src={preview.file ? URL.createObjectURL(preview.file) : preview.url} alt="Preview" style={{ marginRight: 10, width: "100%" }} />
              <Box className="row" sx={{ width: "100%" }}>
                <TextField InputLabelProps={{ shrink: true }} fullWidth type="text" label="Menu Description" sx={{ mt: 1.5 }} value={preview.pic_desc || ""} onChange={(e) => handleNameChange(e, idx)} />
                <IconButton onClick={() => handleClear(idx)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          ))}
      </Box>
    </Box>
  );
};

export default MenuImgUpload;
