import React from "react";
import { View, Text } from "react-native";

export function date(date) {
  const months = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const d = new Date(date);

  return `${d.getHours()}:${d.getMinutes()} - ${d.getDay()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;
}
