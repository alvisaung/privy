import React, { FC, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemText, Rating, Stack, Typography } from "@mui/material";

import "swiper/swiper.css";
import { Edit, LocalAtm, LocationOn, Money } from "@mui/icons-material";
import ImageCarousel from "@/components/ImageCarousel";
import Head from "next/head";
import Review from "@/components/Review";
import { useRouter } from "next/router";
import ChefApiService from "@/services/api/ChefApiService";
import { MenuData, Time } from "@/services/types/menu.type";
import { ReviewInterface } from "@/services/types/review.type";
import Hp from "@/services/Hp";

interface PageProps {
  slug: string;
  menu: MenuData | null;
  reviews: ReviewInterface[] | [];
}

const MenuDetail: FC = () => {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [reviews, setReview] = useState<ReviewInterface[] | []>("");

  const router = useRouter();
  useEffect(() => {
    onStart();
  }, []);
  const onStart = async () => {
    const { slug } = router.query;
    const _slug = slug ?? "";
    let res = await ChefApiService.GetMenuDetail(slug);

    const reviews = [
      {
        name: "John Doe",
        time: "3 days ago",
        rating: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui at velit consequat blandit. Nullam vel ornare velit.",
      },
      {
        name: "Jane Smith",
        time: "1 week ago",
        rating: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui at velit consequat blandit. Nullam vel ornare velit.",
      },
    ];
    setMenu(res);
    setSlug("");
    setReview(reviews);
  };

  const renderAvailableHr = () => {
    if (!menu) return;
    return menu.menu_schedule.map((menu, idx) => {
      if (menu.from && menu.to) {
        return (
          <ul className="list-item" key={menu.day}>
            <Typography textTransform={"capitalize"}>{Hp.convert_day_to_num(menu.day)}</Typography>
            <Typography variant="h5">{Hp.renderClock(menu.from, menu.to)}</Typography>
          </ul>
        );
      } else {
        return null;
      }
    });
  };

  if (!menu) {
    return (
      <>
        <Typography>Something went wrong.</Typography>
      </>
    );
  }
  return (
    <div>
      <Head>
        <title>{menu.name}</title>
      </Head>
      <ImageCarousel img_gp={menu.menu_pics} />

      <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom align="left" sx={{ mb: 2 }}>
                {menu.name}
              </Typography>
              <Box width={{ xs: "100%", sm: "50%" }} sx={{ mb: 1.5 }} className="row">
                <div className="column">
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Total Served: <span className="ProximaBold">{menu.total_served}</span>
                  </Typography>
                  <Stack alignItems="center" direction={"row"}>
                    <LocalAtm sx={{ mr: 0.5 }} />
                    <Typography variant="h5">${menu.price.toFixed(2)} </Typography>
                  </Stack>
                </div>

                <div className="column">
                  <Typography variant="h5" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                    Rating:
                    <span style={{ marginLeft: 6 }}>{menu.rating ?? 0}</span>
                  </Typography>
                  <Stack alignItems="center" direction={"row"}>
                    <LocationOn sx={{ mr: 0.5 }} />
                    <Typography variant="h5">{menu.address}</Typography>
                  </Stack>
                </div>
              </Box>

              <Typography variant="h5" sx={{ mb: 2 }}>
                {menu.description}
              </Typography>

              <Box className="bar"></Box>

              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={7} sm={6}>
                  <Typography className="ProximaBold" variant="h4" sx={{ mb: 1 }}>
                    Available Hours
                  </Typography>
                  {renderAvailableHr()}
                </Grid>
                <Grid item xs={5} sm={6}>
                  <Typography className="ProximaBold" variant="h4" sx={{ mb: 1 }}>
                    Ingredients
                  </Typography>
                  <ul style={{ marginLeft: 12 }}>
                    {menu.ingredients.map((ingredient) => (
                      <li className="list-item" key={ingredient}>
                        <Typography>{ingredient}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent={"space-between"} sx={{ mt: 3 }}>
                <Typography variant="h5">
                  Status: <span className="ProximaBold">{menu.is_public ? "Public" : "Draft"}</span>
                </Typography>
                <Typography variant="h5" width={{ xs: "100%", sm: "50%" }}>
                  Pre-order Time: <span className="ProximaBold">{menu.pre_order_time ?? 0} Day</span>
                </Typography>
              </Stack>
              {/* <CardActions> */}
              <Button onClick={() => router.push(`/chef/menu/${slug}/edit`)} variant="outlined" sx={{ m: "auto", display: "flex", mt: 4 }} startIcon={<Edit />}>
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Review reviews={reviews} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MenuDetail;
