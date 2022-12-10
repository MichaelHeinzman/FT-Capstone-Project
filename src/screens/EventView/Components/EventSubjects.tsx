import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import StyledButton from "../../../components/StyledButton";
import StyledTextInput from "../../../components/StyledTextInput";
import { addSubject } from "../../../firebase";
import { useGetItemsFromSubjects } from "../../../hooks/useGetItemsFromSubjects";
import { Event } from "../../../types";
type Props = {
  setSubject: React.Dispatch<any>;
  setPopup: React.Dispatch<any>;
  styles: any;
  newSubject: any;
  event: Event;
  subjects: any;
};

const EventSubjects = ({
  setSubject,
  setPopup,
  subjects,
  styles,
  newSubject,
  event,
}: Props) => {
  const { items, setItems } = useGetItemsFromSubjects(subjects);
  const [subjectAddANewSubject, setSubjectAddANewSubject] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(newSubject?.name);
  const [subject, setNewSubject] = useState<any>();

  useEffect(() => {
    if (value) setSubject(subjects[value].name);
  }, [value]);

  useEffect(() => {
    setValue(newSubject?.name);
  }, []);

  const handleAddANewSubject = async () => {
    await addSubject({ events: {}, name: subject });
    setValue(subject);
  };

  const renderEmptyComponent = () => (
    <View style={{ padding: 10, backgroundColor: "red" }}>
      <Text>No Subjects Available, Create A New one.</Text>
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
            placeholder="Select a Subject"
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
            {subjectAddANewSubject && (
              <StyledTextInput
                placeholderTextColor={event.color}
                value={newSubject}
                placeholder={"Type New Subject Name"}
                onChangeEvent={(v) => setNewSubject(v)}
                secureTextEntry={false}
                error={null}
                givenStyles={[
                  styles.titleInput,
                  newSubject === "" && { color: "grey" },
                  { flex: 0.3 },
                ]}
              />
            )}
            <StyledButton
              buttonStyle={styles.popupAdd}
              text="Add a New Subject"
              textStyle={styles.buttonText}
              onPressEvent={() => {
                if (!subjectAddANewSubject) {
                  setSubjectAddANewSubject(true);
                } else {
                  setSubjectAddANewSubject(false);
                  handleAddANewSubject();
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

export default EventSubjects;
