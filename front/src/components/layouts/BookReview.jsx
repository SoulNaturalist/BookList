import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Button from "@mui/material/Button";

export default function BookReview(props) {
  if (props.user_review) {
    return (
      <Card
        sx={{
          maxWidth: 700,
          display: "block",
          margin: "auto",
          position: "relative",
          top: "280px",
          marginTop: "25px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.username}
            </Typography>
            <Typography variant="body1" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.review}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              Оценка пользователя {props.rating}/10
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="success"
            variant="outlined"
            onClick={() =>
              navigator.clipboard.writeText(document.URL + "#" + props.id)
            }
          >
            Поделиться
          </Button>
        </CardActions>
      </Card>
    );
  } else if (props.owner) {
    return (
      <Card
        sx={{
          maxWidth: 700,
          display: "block",
          margin: "auto",
          position: "relative",
          top: "280px",
          marginTop: "25px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.username}
            </Typography>
            <Typography variant="body1" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.review}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              Оценка пользователя {props.rating}/10
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="success"
            variant="outlined"
            onClick={() =>
              navigator.clipboard.writeText(document.URL + "#" + props.id)
            }
          >
            Поделиться
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() =>
              console.log("Редиректить на форму написания рецензии...")
            }
          >
            Редактировать
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() =>
              console.log("Удаление при предпросмотре пока не реализовано...")
            }
          >
            Удалить
          </Button>
        </CardActions>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        maxWidth: 500,
        display: "block",
        margin: "auto",
        position: "relative",
        top: "150px",
        marginTop: "25px",
      }}
      id={props.id}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.username}
          </Typography>
          <Typography variant="body1" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.review}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="success"
          variant="outlined"
          onClick={() =>
            navigator.clipboard.writeText(document.URL + "#" + props.id)
          }
        >
          Поделиться
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() =>
            console.log(`Вам понравилась рецензия ${props.username}`)
          }
        >
          ♡
        </Button>
      </CardActions>
    </Card>
  );
}
