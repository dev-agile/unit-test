import express from "express";
import bodyParser from "body-parser";
import lineItems from "./constant/lineItems.js";
import DELIVERY_DATES from "./constant/deliveryDates.js";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var clonelineItem = lineItems;

app.post("/items", (req, res) => {
  const postalCode = req.query.postalCode;
  if (postalCode != undefined) {
    const dateIndex = DELIVERY_DATES.filter((obj) => obj.postal == postalCode.toUpperCase());

    if (dateIndex.length > 0) {
      dateIndex.forEach((obj) => {
        obj.ids.forEach((data) => {
          const objIndex = clonelineItem.findIndex((obj) => obj.id == data);

          clonelineItem[objIndex].estimatedDeliveryDate =
            obj.estimatedDeliveryDate;
        });
      });

      res.status(200).json({ data: clonelineItem });
    } else {
      res.status(404).json({ message: "Postal code invalid" });
    }
  } else {
    res.status(200).json({ data: lineItems });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
