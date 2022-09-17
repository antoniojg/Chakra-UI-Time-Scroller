import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Stack,
  StackDirection,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="black"
        _checked={{
          bg: "grey",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={0.5}
        py={0.5}
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface Props {
  handleStartTime: any;
  handleEndTime: any;
  removeLabels?: boolean;
}

export default function TimePicker({
  handleStartTime,
  handleEndTime,
  removeLabels = false,
}: Props) {
  const hours = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minutes = ["00", "15", "30", "45"];

  const [currentStartHourIndex, setCurrentStartHourIndex] = useState<any>(0);
  const [currentStartHour, setCurrentStartHour] = useState(
    hours[currentStartHourIndex]
  );
  const [currentStartMinuteIndex, setCurrentStartMinuteIndex] =
    useState<any>(0);
  const [currentStartMinute, setCurrentStartMinute] = useState<any>(
    minutes[currentStartMinuteIndex]
  );
  const [startAmPm, setStartAmPm] = useState<any>("AM");

  const [currentEndHourIndex, setCurrentEndHourIndex] = useState<any>(0);
  const [currentEndHour, setCurrentEndHour] = useState(
    hours[currentEndHourIndex]
  );
  const [currentEndMinuteIndex, setCurrentEndMinuteIndex] = useState<any>(0);
  const [currentEndMinute, setCurrentEndMinute] = useState<any>(
    minutes[currentEndMinuteIndex]
  );
  const [endAmPm, setEndAmPm] = useState<any>("AM");

  const [startTime, setStartTime] = useState<string>("02:00 AM");
  const [endTime, setEndTime] = useState<string>("01:00 AM");

  useEffect(() => {
    setStartTime(currentStartHour + ":" + currentStartMinute + " " + startAmPm);
  }, [currentStartHour, currentStartMinute, startAmPm]);

  useEffect(() => {
    handleStartTime(startTime);
  }, [startTime]);

  useEffect(() => {
    setEndTime(currentEndHour + ":" + currentEndMinute + " " + endAmPm);
  }, [currentEndHour, currentEndMinute, endAmPm]);

  useEffect(() => {
    handleEndTime(endTime);
  }, [endTime]);

  useEffect(() => {
    setCurrentStartHour(hours[currentStartHourIndex]);
  }, [currentStartHourIndex]);

  useEffect(() => {
    setCurrentStartMinute(minutes[currentStartMinuteIndex]);
  }, [currentStartMinuteIndex]);

  useEffect(() => {
    setCurrentEndHour(hours[currentEndHourIndex]);
  }, [currentEndHourIndex]);

  useEffect(() => {
    setCurrentEndMinute(minutes[currentEndMinuteIndex]);
  }, [currentEndMinuteIndex]);

  const changeHourUp = (hourIndex: number, setHourIndex: any) => {
    if (hourIndex == 11) {
      setHourIndex(0);
    } else {
      setHourIndex(hourIndex + 1);
    }
  };

  const changeHourDown = (
    hourIndex: number,
    setHourIndex: any,
    setCurrentHour: any
  ) => {
    if (hourIndex == 0) {
      setHourIndex(11);
    } else {
      setHourIndex(hourIndex - 1);
    }
    setCurrentHour(hours[hourIndex]);
  };

  const changeMinuteUp = (minuteIndex: number, setMinuteIndex: any) => {
    if (minuteIndex == 3) {
      setMinuteIndex(0);
    } else {
      setMinuteIndex(minuteIndex + 1);
    }
  };

  const changeMinuteDown = (
    minuteIndex: number,
    setMinuteIndex: any,
    setCurrentMinute: any
  ) => {
    if (minuteIndex == 0) {
      setMinuteIndex(3);
    } else {
      setMinuteIndex(minuteIndex - 1);
    }
    setCurrentMinute(minutes[minuteIndex]);
  };

  const hourBox = (
    hourIndex: number,
    setHourIndex: any,
    currenthour: any,
    setCurrentHour: any
  ) => {
    return (
      <Stack direction={"column"}>
        <IconButton
          icon={<ChevronUpIcon />}
          aria-label="value-up"
          {...styles.arrowButtons}
          onClick={() => changeHourUp(hourIndex, setHourIndex)}
        />
        <Box {...styles.timeBoxes}>{currenthour}</Box>
        <IconButton
          icon={<ChevronDownIcon />}
          aria-label="value-down"
          {...styles.arrowButtons}
          onClick={() =>
            changeHourDown(hourIndex, setHourIndex, setCurrentHour)
          }
        />
      </Stack>
    );
  };

  const minuteBox = (
    minuteIndex: any,
    setMinuteIndex: any,
    currentMinute: number,
    setCurrentMinute: any
  ) => {
    return (
      <Stack direction={"column"}>
        <IconButton
          icon={<ChevronUpIcon />}
          aria-label="value-up"
          {...styles.arrowButtons}
          onClick={() => changeMinuteUp(minuteIndex, setMinuteIndex)}
        />
        <Box {...styles.timeBoxes}>{currentMinute}</Box>
        <IconButton
          icon={<ChevronDownIcon />}
          aria-label="value-down"
          {...styles.arrowButtons}
          onClick={() =>
            changeMinuteDown(minuteIndex, setMinuteIndex, setCurrentMinute)
          }
        />
      </Stack>
    );
  };

  const SetAmPm = (setAmPm: any) => {
    const options = ["AM", "PM"];

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: "AM",
      onChange: setAmPm,
    });

    const group = getRootProps();
    return (
      <VStack {...group} style={{ marginTop: 20 }}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </VStack>
    );
  };

  return (
    <Stack direction={"row"}>
      <Stack direction={"column"}>
        {!removeLabels ? (
          <Text color="black" align="center">
            Start
          </Text>
        ) : null}
        <Stack direction={"row"}>
          {hourBox(
            currentStartHourIndex,
            setCurrentStartHourIndex,
            currentStartHour,
            setCurrentStartHour
          )}
          <Heading {...styles.colon}>:</Heading>
          {minuteBox(
            currentStartMinuteIndex,
            setCurrentStartMinuteIndex,
            currentStartMinute,
            setCurrentStartMinute
          )}
          {SetAmPm(setStartAmPm)}
        </Stack>
      </Stack>

      <span style={{ width: 100 }}></span>

      <Stack direction={"column"}>
        {!removeLabels ? (
          <Text color="black" align="center">
            End
          </Text>
        ) : null}
        <Stack direction={"row"}>
          {hourBox(
            currentEndHourIndex,
            setCurrentEndHourIndex,
            currentEndHour,
            setCurrentEndHour
          )}
          <Heading {...styles.colon}>:</Heading>
          {minuteBox(
            currentEndMinuteIndex,
            setCurrentEndMinuteIndex,
            currentEndMinute,
            setCurrentEndMinute
          )}
          {SetAmPm(setEndAmPm)}
        </Stack>
      </Stack>
    </Stack>
  );
}

const styles = {
  stack: {
    spacing: 8,
    direction: ["column", "row"] as StackDirection,
    align: ["flex-start", "center"],
    justify: "center",
  },
  arrowButtons: {
    _hover: {
      backgroundColor: "none",
    },
    width: 75,
    height: 5,
    backgroundColor: "none",
  },
  timeBoxes: {
    width: 75,
    height: 55,
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
    border: "1px solid grey",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colon: {
    color: "black",
    paddingTop: 25,
  },
  amBox: {
    border: "1px solid black",
    borderRadius: 5,
    padding: 0,
    margin: 0,
  },
  headerAmPm: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    padding: 1,
  },
};
