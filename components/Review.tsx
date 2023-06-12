import { ReviewInterface } from "@/services/types/review.type";
import { Lock } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Rating, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";

const Review: FC<{ reviews: ReviewInterface[] }> = ({ reviews }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>{`${reviews.length} Review${reviews.length > 0 ? "s" : ""}`}</Typography>
        <Box sx={{ mb: 5 }}>
          {" "}
          {reviews.map((review: ReviewInterface, idx: number) => (
            <Box key={idx} display="flex" mb={3}>
              <Avatar sx={{ bgcolor: grey[500], mr: 2 }}>{review.name[0]}</Avatar>
              <Box flex={1}>
                <Typography variant="body1">
                  {review.name} - {review.time}
                </Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body1" component="div">
                  {review.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Leave a Review
        </Typography>
        <Box sx={{ p: 2, background: "#fffDE4", border: "1px solid #E4DFA8" }} display={"flex"}>
          <Lock sx={{ fontSize: 20, mr: 1 }} />
          <Typography>
            Please <span>log in</span> or <span>register</span> in order to leave a review.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Review;
