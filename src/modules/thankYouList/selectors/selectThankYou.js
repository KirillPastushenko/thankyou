import React from "react";
import { createSelector } from "reselect";
import Moment from "react-moment";
import "moment/locale/ru";

const getThankYou = state => state.modules.thankYou.items;

export const selectThankYou = createSelector(
  [getThankYou],
  items => {
    console.log(items);
    const retItems = items.map(item => {
      return {
        id: item.ID,
        title: item.Title,
        from: item.AppFrom.get_lookupValue(),
        fromId: item.AppFrom.get_lookupId(),
        fromUserId: parseInt(item.AppFromUserId.get_lookupValue()),
        to: item.AppTo.get_lookupValue(),
        toId: item.AppTo.get_lookupId(),
        toUserId: parseInt(item.AppToUserId.get_lookupValue()),
        scores: item.AppScores,
        text: item.AppText,
        nomination: item.AppNomination.get_lookupValue(),
        date: <Moment format="DD MMMM YYYY HH:mm">{item.Created}</Moment>,
        key: item.ID,
        likedBy:
          item.LikedBy &&
          item.LikedBy.map(liker => {
            return { id: liker.get_lookupId(), name: liker.get_lookupValue() };
          }),
        likesCount: item.LikesCount
      };
    });
    console.log(retItems);
    return retItems;
  }
);
