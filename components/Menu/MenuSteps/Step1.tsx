import React, { FC, KeyboardEvent, MouseEvent, useContext, useState } from "react";
import MenuImgUpload from "../MenuImgUpload";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { MenuFormContext } from "@/utils/Context/MenuProvider";
import SnackBarContext, { SnackType } from "@/utils/Context/SnackBarProvider";
import { MenuPic } from "@/services/types/general";

interface Step2 {
  handleInputChange: (event: any) => void;
}

const Step1: FC<Step2> = ({ handleInputChange }) => {
  const { menuForm, setMenuForm } = useContext(MenuFormContext);
  const [ingredient, setIngredient] = useState("");
  const { showSnackbar } = useContext(SnackBarContext);

  const onCreateIngredient = (event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) => {
    if (event && "key" in event && event.key != "Enter") {
      return;
    }
    if (ingredient == "") {
      showSnackbar("Ingredient Needed", SnackType.error);
      return;
    }
    setIngredient("");
    setMenuForm({ ...menuForm, ingredients: [...menuForm.ingredients, ingredient] });
  };

  const onDeleteIngredient = (idx: number) => {
    let _ingre_list = [...menuForm.ingredients];
    _ingre_list.splice(idx, 1);
    setMenuForm({ ...menuForm, ingredients: _ingre_list });
  };

  return (
    <div>
      <MenuImgUpload menuImgs={menuForm.menu_pics} setMenuImgs={(menu_pics: MenuPic[]) => setMenuForm({ ...menuForm, menu_pics })} />
      <TextField margin="normal" required fullWidth label="Menu Name" name="name" value={menuForm.name} onChange={handleInputChange} />
      <TextField margin="normal" required fullWidth label="Menu Description" name="description" value={menuForm.description} onChange={handleInputChange} multiline rows={4} />
      <Typography variant="h4" sx={{ mb: 1, mt: 1 }}>
        Ingredients
      </Typography>
      <Box display={"flex"} sx={{ mb: 2 }}>
        <TextField onKeyDown={(e) => onCreateIngredient(e)} value={ingredient} fullWidth onChange={(e) => setIngredient(e.target.value)} label="Main Ingredients" placeholder="Main Ingredients" />
        <Button variant="outlined" onClick={onCreateIngredient}>
          Add
        </Button>
      </Box>
      {menuForm.ingredients.map((ingredient, index: number) => (
        <Chip sx={{ mr: 1 }} key={index} label={ingredient} onDelete={() => onDeleteIngredient(index)} />
      ))}
    </div>
  );
};

export default Step1;
