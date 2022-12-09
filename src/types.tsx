/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Calendar: undefined;
  Dashboard: undefined;
  Settings: undefined;
  Modal: undefined;
  NotFound: undefined;
  EventForm: undefined;
  EventView: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type Event = {
  id?: string;
  title: string;
  description: string;
  subject: string;
  type: string;
  recurring: { frequency: string; every: string; end: string };
  color: string;
  dates: { start: string };
  times: { start: string; end: string; timeExpectedToSpend: number };
  alarm: { time: string; isOn: boolean };
};
