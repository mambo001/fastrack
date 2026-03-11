import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  format,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from "date-fns";

import { useFastContext } from "../../context";
import type { Session } from "../../../types";

export const sessionFields = [
  "id",
  "window",
  "startedAt",
  "endedAt",
] as const satisfies ReadonlyArray<keyof Session>;

const renderFormattedDate = (date: Date | null) => {
  return date ? format(new Date(date), "MMM, dd HH:mm aa") : "";
};

const camelCaseToTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function FastingSessionsTable() {
  const { sessions } = useFastContext();
  const renderTableHeadRows = () => {
    if (sessions.length === 0) return null;

    const [_, ...remainingKeys] = sessionFields;
    return remainingKeys
      .map((key) => {
        if (key === "window")
          return (
            <TableCell size="small" key={key}>
              Goal(hrs)
            </TableCell>
          );

        return <TableCell key={key}>{camelCaseToTitleCase(key)}</TableCell>;
      })
      .concat(<TableCell key="duration">Duration</TableCell>);
  };
  const renderTableBodyRows = () => {
    return (
      sessions.length > 0 &&
      sessions.map((session) => (
        <TableRow key={session.id}>
          <TableCell>{session.window}</TableCell>
          <TableCell>{renderFormattedDate(session.startedAt)}</TableCell>
          <TableCell>{renderFormattedDate(session.endedAt)}</TableCell>
          <TableCell>
            {session.startedAt &&
              session.endedAt === null &&
              formatDistanceToNowStrict(new Date(session.startedAt))}
            {session.startedAt && session.endedAt
              ? formatDistanceStrict(
                  new Date(session.startedAt),
                  new Date(session.endedAt),
                  {
                    unit: "minute",
                  },
                )
              : ""}
          </TableCell>
        </TableRow>
      ))
    );
  };
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: "70svh" }}>
      <Table>
        <TableHead>
          <TableRow>{renderTableHeadRows()}</TableRow>
        </TableHead>
        <TableBody>{renderTableBodyRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}
