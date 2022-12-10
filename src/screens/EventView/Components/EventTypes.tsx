import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import StyledButton from "../../../components/StyledButton";
import StyledTextInput from "../../../components/StyledTextInput";
import { addSubject } from "../../../firebase";
import { useGetTypesFromSubject } from "../../../hooks/useGetTypesFromSubject";
import { Event } from "../../../types";
type Props = {
  setType: React.Dispatch<any>;
  setPopup: React.Dispatch<any>;
  event: Event;
  subject: any;
  newType: any;
  styles: any;
};

const EventTypes = ({
  setType,
  setPopup,
  subject,
  styles,
  event,
  newType,
}: Props) => {
  const { types } = useGetTypesFromSubject(subject);
  const [TypeAddANewType, setTypeAddANewType] = useState(false);
  const [items, setItems] = useState<any[]>(types);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(newType);
  const [type, setNewType] = useState("");

  useEffect(() => {
    if (value) setType(value);
  }, [value]);

  const handleAddANewType = () => {
    const temp = {
      ...subject.events,
      [type]: { averageTimeTook: 0, averageEstimatedTimeTook: 0 },
    };
    addSubject({ ...subject, events: temp });
    setValue(type);
  };

  useEffect(() => {
    setItems(types);
  }, [types]);

  const renderEmptyComponent = () => (
    <View style={{ padding: 10, backgroundColor: "red" }}>
      <Text>No Types Available, for {subject?.name} Create A New one.</Text>
    </View>
  );
  return (
    <View style={styles.popup}>
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <DropDownPicker
            searchable
            itemSeparator
            open={open}
            value={value}
            items={items}
            loading={true}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropDown}
            listMode="SCROLLVIEW"
            placeholder="Select a Type"
            zIndex={3000}
            zIndexInverse={1000}
            ListEmptyComponent={renderEmptyComponent}
          />

          <View
            style={{
              flex: 0.8,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {TypeAddANewType && (
              <StyledTextInput
                placeholderTextColor={event.color}
                value={type}
                placeholder={"Type New Type Name"}
                onChangeEvent={(v) => setNewType(v)}
                secureTextEntry={false}
                error={null}
                givenStyles={[
                  styles.titleInput,
                  newType === "" && { color: "grey" },
                  { flex: 0.3 },
                ]}
              />
            )}
            <StyledButton
              buttonStyle={styles.popupAdd}
              text="Add a New Type"
              textStyle={styles.buttonText}
              onPressEvent={() => {
                if (!TypeAddANewType) {
                  setTypeAddANewType(true);
                } else {
                  setTypeAddANewType(false);
                  handleAddANewType();
                }
              }}
            />

            {value && (
              <StyledButton
                buttonStyle={styles.popupAdd}
                text="Complete"
                textStyle={styles.buttonText}
                onPressEvent={() => setPopup(false)}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventTypes;
