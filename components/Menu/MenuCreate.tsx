import React, { FC, useContext, useEffect, useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Step, StepLabel, Stepper, Box, Chip } from "@mui/material";
import SnackBarContext, { SnackType } from "@/utils/Context/SnackBarProvider";
import { CheckCircle } from "@mui/icons-material";
import ChefApiService from "@/services/api/ChefApiService";
import LocalStorage from "@/services/storage/LocalStorage";
import { useRouter } from "next/router";
import { MenuData } from "@/services/types/menu.type";
import Hp from "@/services/Hp";
import { MenuFormContext } from "@/utils/Context/MenuProvider";
import Step2 from "./MenuSteps/Step2";
import { AuthContext } from "@/utils/Context/AuthProvider";
import Step1 from "./MenuSteps/Step1";

interface MenuCreateProps {
  edit?: boolean;
  editFormData?: MenuData;
}

const MenuCreate: FC<MenuCreateProps> = ({ edit, editFormData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { showSnackbar } = useContext(SnackBarContext);
  const { menuForm, setMenuForm } = useContext(MenuFormContext);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (edit && editFormData) {
      setMenuForm(editFormData);
    } else {
      setMenuForm({ ...menuForm, address: user?.address ?? "" });
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown }>) => {
    setMenuForm({
      ...menuForm,
      [event.target.name as string]: event.target.value,
    });
  };

  const uploadMenuImg = async () => {
    let menu_pics = [...menuForm.menu_pics];
    menu_pics = await Promise.all(
      menu_pics.map(async (menu) => {
        const url = await ChefApiService.UploadImg(menu.file, showSnackbar);
        return { ...menu, url };
      })
    );
    // Convert Day Data
    let _menu_schedule = [...menuForm.menu_schedule].map((menu) => {
      return { ...menu, day: Hp.convert_day_to_num(menu.day) };
    });

    return { ...menuForm, menu_pics, menu_schedule: _menu_schedule };
  };

  const handleSubmit = async (is_public: boolean) => {
    const updated_form_data = await uploadMenuImg();
    // return;
    const menu_slug = LocalStorage.getMenuSlug();
    updated_form_data.is_public = is_public;

    if (!edit) {
      let res = await ChefApiService.CreateMenu(updated_form_data, showSnackbar);
      if (!res) return;
    } else {
      // Update Menu
      let res = await ChefApiService.UpdateMenu({ ...updated_form_data, menu_slug, activeStep }, showSnackbar);
      if (!res) return;
    }
    router.push("/chef/");
  };
  const timeSlotEmpty = () => {
    const _schedule = [...menuForm.menu_schedule];
    const has_time_fill = _schedule.filter((sch) => sch.from);

    return has_time_fill.length > 0 ? false : true;
  };

  const NextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeStep == 0 && menuForm.menu_pics.length == 0) {
      showSnackbar("Menu Imgs Require", SnackType.error);
      return;
    }
    if (activeStep == 0 && menuForm.ingredients.length == 0) {
      showSnackbar("Ingredients Needed", SnackType.error);
      return;
    }
    if (activeStep == 1 && timeSlotEmpty()) {
      showSnackbar("Time slot Needed", SnackType.error);
      return;
    }
    if (activeStep == steps.length - 1) {
      handleSubmit(true);
      return;
    }
    let new_step = activeStep + 1;
    setActiveStep(new_step);
  };

  const renderStep3 = () => (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"} sx={{ p: { xs: 0, sm: 2 } }}>
      <CheckCircle sx={{ color: "green", fontSize: 100, m: 2 }} />
      <Typography variant="h2" align="center" sx={{ mb: 1 }}>
        Almost There!
      </Typography>
      <Typography variant="body1" align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id urna mattis dapibus. Suspendisse imperdiet tincidunt orci, non lacinia enim volutpat non. Sed ut ipsum euismod, vehicula quam at, cursus sapien. Sed tristique, nibh vitae cursus varius, justo est fermentum dolor, quis gravida felis urna at turpis.
      </Typography>
    </Box>
  );

  const StepSwitch = () => {
    switch (activeStep) {
      case 0:
        return <Step1 handleInputChange={handleInputChange} />;
      case 1:
        return <Step2 handleInputChange={handleInputChange} />;
      case 2:
        return renderStep3();
      default:
        break;
    }
  };

  const steps = ["Upload Menu", "Menu Detail", "Confirmation"];

  return (
    <div>
      <Card sx={{ width: { xs: "95%", sm: "80%" }, m: "auto", mt: 2 }}>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography variant="h1" sx={{ mb: 4 }} textAlign={"center"}>
            {edit ? "Edit Menu" : "Create Menu"}
          </Typography>
          <Stepper alternativeLabel={true} activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form
            onSubmit={NextStep}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            {StepSwitch()}

            <Box className="row" alignItems="center" sx={{ mt: 5 }}>
              {activeStep != 0 && (
                <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep - 1)}>
                  Back
                </Button>
              )}
              <Box>
                {activeStep == steps.length - 1 && (
                  <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleSubmit(false)}>
                    Save as Draft
                  </Button>
                )}
                <Button type="submit" variant="contained">
                  {activeStep != steps.length - 1 ? "Next" : "Submit"}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuCreate;
