import { Center, SimpleGrid, Spacer, Stack, Text, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { Attendee as AttendeeType, Attendees as AttendeesType } from "../types";

const safeLimit = () => dayjs().subtract(9, "s");
const warnLimit = () => dayjs().subtract(10, "s");

type ConnectionStatus = "good" | "warn" | "die";

const attendeeConnectionStatus = (attendee: AttendeeType): ConnectionStatus => {
  const day = dayjs(attendee.pingAt);
  if (day.isAfter(safeLimit())) {
    return "good";
  } else if (warnLimit().isAfter(day)) {
    return "warn";
  } else {
    return "die";
  }
};

const AttendeeStatus: React.FC<{ attendee: AttendeeType }> = ({ attendee }) => {
  return (
    <Text
      fontSize="2xl"
      style={{
        transition: ".5s",
        opacity: attendee.status ? 1 : 0,
      }}
    >
      {attendee.status}
    </Text>
  );
};

export const Attendee: React.FC<{ attendee: AttendeeType }> = ({ attendee }) => {
  const [borderColor, setBorderColor] = useState("gray.200");
  useEffect(() => {
    const getBorderColor = (attendee: AttendeeType): string => {
      if (attendee.status) {
        return "teal.200";
      }
      switch (attendeeConnectionStatus(attendee)) {
        case "good":
          return "gray.200";
        case "warn":
          return "yellow.200";
        case "die":
          return "red.200";
      }
    };
    setBorderColor(getBorderColor(attendee));
  }, [attendee.id, attendee.status, attendee.pingAt]);
  return (
    <Tooltip isDisabled={attendeeConnectionStatus(attendee) !== "warn"} label="通信状態が不安定かも！？">
      <Stack
        border="1px"
        borderRadius="4px"
        borderColor={borderColor}
        h="88px"
        p={1}
        style={{
          transition: "border .5s ease-out",
        }}
      >
        <Center>
          <AttendeeStatus attendee={attendee} />
        </Center>
        <Spacer />
        <Text fontSize="sm" color="gray.800">
          {attendee.displayName}
        </Text>
      </Stack>
    </Tooltip>
  );
};

export const Attendees: React.FC<{ attendees: AttendeesType }> = ({ attendees }) => {
  const elements = attendees
    .sort((a, b) => (b.status || "").localeCompare(a.status || "") || 0)
    .map((attendee) => (
      <Flipped key={attendee.id} flipId={attendee.id}>
        <div>
          <Attendee attendee={attendee} key={attendee.id} />
        </div>
      </Flipped>
    ));

  return (
    <Flipper flipKey={attendees.map((a) => a.id).join("")}>
      <SimpleGrid columns={2} spacing={10} p={4}>
        {elements}
      </SimpleGrid>
    </Flipper>
  );
};
