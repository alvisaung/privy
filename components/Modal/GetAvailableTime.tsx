import Hp from "@/services/Hp";
import { OpenHours, Time } from "@/services/types/menu.type";
import SnackBarContext, { SnackType } from "@/utils/Context/SnackBarProvider";
import { AccessTimeFilled } from "@mui/icons-material";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, InputAdornment, TextField, Fade, Grow, Stack } from "@mui/material";
import { DesktopTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useContext, useEffect, useState } from "react";

interface AvaProps {
  menu_schedule: OpenHours;
  setMenuSchedule: (schedule: OpenHours) => void;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

const GetAvailableTime: FC<AvaProps> = ({ menu_schedule, setMenuSchedule, openDialog, setOpenDialog }) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const { showSnackbar } = useContext(SnackBarContext);
  useEffect(() => {
    if (!openDialog) return;
    const start = menu_schedule.from;
    const end = menu_schedule.to;
    let initStart = null;
    let initEnd = null;
    if (start) {
      initStart = dayjs().hour(start.hr).minute(start.min);
    }
    if (end) {
      initEnd = dayjs().hour(end.hr).minute(end.min);
    }
    setStartTime(initStart);
    setEndTime(initEnd);
  }, [openDialog]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onAddTimeSlot = () => {
    let _menu_schedule = { ...menu_schedule };
    if (!startTime || !endTime) return;

    _menu_schedule.from = { hr: startTime.hour(), min: startTime.minute() };
    _menu_schedule.to = { hr: endTime.hour(), min: endTime.minute() };
    setMenuSchedule(_menu_schedule);
    onCloseDialog();
    showSnackbar(`Time slot added success`, SnackType.success);
  };
  const onDeleteTimeSlot = () => {
    let _menu_schedule = { ...menu_schedule };
    _menu_schedule.from = null;
    _menu_schedule.to = null;
    setMenuSchedule(_menu_schedule);
    onCloseDialog();
    showSnackbar(`Delete success`, SnackType.success);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4">{Hp.convert_day_to_num(menu_schedule.day)} free time</Typography>{" "}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box alignItems={"center"} sx={{ mt: 1, display: { xs: "block", sm: "flex" } }}>
            <DesktopTimePicker timeSteps={{ hours: 1, minutes: 30 }} label="Start Time" defaultValue={dayjs().set("hour", 18)} value={startTime} onChange={(value) => setStartTime(value)} />
            <Typography textAlign={"center"} sx={{ m: 2 }}>
              to
            </Typography>
            <DesktopTimePicker
              timeSteps={{ hours: 1, minutes: 30 }}
              minTime={dayjs()
                .set("hour", startTime ? startTime.hour() : 12)
                .set("minute", startTime ? startTime.minute() + 20 : 30)}
              label="End Time"
              defaultValue={endTime}
              value={endTime}
              onChange={(value) => setEndTime(value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack sx={{ width: "100%" }} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Box>
              {menu_schedule.from && (
                <Button onClick={onDeleteTimeSlot} color="primary" sx={{ mr: 1 }}>
                  Delete
                </Button>
              )}
              <Button onClick={onAddTimeSlot} color="primary">
                Submit
              </Button>
            </Box>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetAvailableTime;
