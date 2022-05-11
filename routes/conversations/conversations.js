import express from "express";
import mongoose from "mongoose";
import Message from "../../db/schema/Message.js";
import Converstion from "../../db/schema/Converstions.js";
import eachConv from "./eachconv.js";

const router = express.Router();
router.post("/", async (req, res) => {
  const UserId = req.headers.a_custom_header;
  const { receiver } = req.body;
  // console.log(receiver, UserId);
  try {
    await Converstion.find({
      members: { $in: [UserId] },
    }).then(async (document) => {
      if (document) {
        let filtered = document.filter(
          (conver) =>
            conver.members?.includes(UserId) &&
            conver.members?.includes(receiver)
        );
        if (filtered.length <= 0) {
          try {
            await Converstion.create({ members: [UserId, receiver] }).then(
              (convers) => {
                res.json(convers);
              }
            );
          } catch (err) {
            res.status(500).status.json(err);
          }
        } else {
          res.status(200).json({ data: filtered });
        }
      } else {
        try {
          await Converstion.create({ members: [UserId, receiver] }).then(
            (convers) => {
              res.json(convers);
            }
          );
        } catch (err) {
          res.status(500).json(err);
        }
      }
    });
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  const UserId = req.headers.a_custom_header;
  if (typeof UserId !=="undefined") {
    try {
      await Converstion.find({
        members: { $in: [UserId] },
      }).then(async (document) => {
        //   console.log(document);
        res.status(200).json({ data: document });
      });
    } catch (err) {
      res.json(err);
    }
  }
});

router.get("/:id", eachConv);

export default router;