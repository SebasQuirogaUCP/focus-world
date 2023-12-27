import { leaders } from "@/data/LandingPage/leaderboard";
import { Table, Title } from "@mantine/core";

export const Leaderboard = () => {
  const tableHeaders = (
    <tr>
      <th>Country</th>
      <th>User</th>
      <th>Points</th>
    </tr>
  );

  const rows = leaders
    .sort((a, b) => b.points - a.points)
    .map((leader, i) => (
      <tr key={i}>
        <td>{leader.country}</td>
        <td>{leader.user}</td>
        <td>{leader.points}</td>
      </tr>
    ));

  return (
    <>
      <Title>Leaderboard</Title>
      <Table striped withBorder withColumnBorders>
        <thead>{tableHeaders}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
