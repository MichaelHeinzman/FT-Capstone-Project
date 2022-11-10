import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  direction: String;
};

const Arrow = ({ direction }: Props) => {
  return (
    <Text style={{ color: "#ffffff" }}>{direction === "left" ? "<" : ">"}</Text>
  );
};

export default Arrow;

const styles = StyleSheet.create({});
