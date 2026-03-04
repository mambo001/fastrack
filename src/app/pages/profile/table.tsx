import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

import { useFastContext } from "../../context";

const renderFormattedDate = (date: Date | null) => {
  return date ? format(new Date(date), "yyyy-MM-dd HH:mm:ss") : "";
};

const camelCaseToTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function FastingSessionsTable() {
  const { sessions } = useFastContext();
  const renderTableHeadRows = () => {
    if (sessions.length === 0) return null;

    const [_, ...remainingKeys] = Object.keys(sessions[0]!);
    return remainingKeys.map((key) => (
      <TableCell key={key}>{camelCaseToTitleCase(key)}</TableCell>
    ));
  };
  const renderTableBodyRows = () => {
    return (
      sessions.length > 0 &&
      sessions.map((session) => (
        <TableRow key={session.id}>
          <TableCell>{session.window} hours</TableCell>
          <TableCell>{renderFormattedDate(session.startedAt)}</TableCell>
          <TableCell>{renderFormattedDate(session.endedAt)}</TableCell>
        </TableRow>
      ))
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>{renderTableHeadRows()}</TableRow>
        </TableHead>
        <TableBody>{renderTableBodyRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}
