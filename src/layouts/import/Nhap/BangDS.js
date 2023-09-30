import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(mhd, ncc, ngay, tongtien, dieuchinh) {
  return {
    mhd,
    ncc,
    ngay,
    tongtien,
    dieuchinh,
    history: [
      {
        mh: "MH001",
        tenhang: "Bánh gạo",
        gianhap: 20000,
        sl: 10,
      },
      {
        mh: "MH001",
        tenhang: "Kem đánh răng",
        gianhap: 23000,
        sl: 5,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.mhd}
        </TableCell>
        <TableCell align="right">{row.ncc}</TableCell>
        <TableCell align="right">{row.ngay}</TableCell>
        <TableCell align="right">{row.tongtien}</TableCell>
        <TableCell align="left">{row.dieuchinh}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã hàng</TableCell>
                    <TableCell>Tên hàng hóa</TableCell>
                    <TableCell align="left">Giá nhập</TableCell>
                    <TableCell align="left">Số lượng nhập</TableCell>
                    <TableCell align="left">Thành tiền (VNĐ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.mh}>
                      <TableCell component="th" scope="row">
                        {historyRow.mh}
                      </TableCell>
                      <TableCell align="left">{historyRow.tenhang}</TableCell>
                      <TableCell align="left">{historyRow.gianhap}</TableCell>
                      <TableCell align="left">{historyRow.sl}</TableCell>
                      <TableCell align="left">
                        {Math.round(historyRow.gianhap * historyRow.sl * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Card>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    ncc: PropTypes.number.isRequired,
    tongtien: PropTypes.number.isRequired,
    ngay: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        gianhap: PropTypes.number.isRequired,
        sl: PropTypes.number.isRequired,
        tenhang: PropTypes.string.isRequired,
        mh: PropTypes.string.isRequired,
      })
    ).isRequired,
    mhd: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    dieuchinh: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("HDN001", "Công ty A", "09-11-2022", 200000, "Edit"),
  createData("HDN002", "Công ty B", "27-11-2022", 115000, "Edit"),
];
export default function BangDS() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Hóa đơn</TableCell>
            <TableCell align="right">Nhà cung cấp</TableCell>
            <TableCell align="right">Ngày nhập</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="left">Điều chỉnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.mhd} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
