import {queryAll} from "@api/g6";
import Model from "@infe/Model";

export class CustomFlowModel {
  width: number|string = 1800;
  height: number|string = 800;
  items: [] = [];
  showModal: boolean = false;
  selectedItem: object = [];
  // data = {
  //   nodes: [{
  //     "id": "AUD_MATCHED",
  //     "label": "AUD_MATCHED",
  //     "color": "blue"
  //   }, {
  //     "id": "RECYCLE_BIN",
  //     "label": "RECYCLE_BIN"
  //   }, {
  //     "id": "ROOT",
  //     "label": "ROOT",
  //     "color": "red"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S100",
  //     "label": "SU_DELAY_BEGIN_S100",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S101",
  //     "label": "SU_DELAY_BEGIN_S101",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S102",
  //     "label": "SU_DELAY_BEGIN_S102",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S103",
  //     "label": "SU_DELAY_BEGIN_S103",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S104",
  //     "label": "SU_DELAY_BEGIN_S104",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S105",
  //     "label": "SU_DELAY_BEGIN_S105",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_BEGIN_S106",
  //     "label": "SU_DELAY_BEGIN_S106",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S100",
  //     "label": "SU_DELAY_END_S100",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S101",
  //     "label": "SU_DELAY_END_S101",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S102",
  //     "label": "SU_DELAY_END_S102",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S103",
  //     "label": "SU_DELAY_END_S103",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S104",
  //     "label": "SU_DELAY_END_S104",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S105",
  //     "label": "SU_DELAY_END_S105",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_DELAY_END_S106",
  //     "label": "SU_DELAY_END_S106",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S100",
  //     "label": "SU_MATCHED_S100",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S101",
  //     "label": "SU_MATCHED_S101",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S102",
  //     "label": "SU_MATCHED_S102",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S103",
  //     "label": "SU_MATCHED_S103",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S104",
  //     "label": "SU_MATCHED_S104",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S105",
  //     "label": "SU_MATCHED_S105",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MATCHED_S106",
  //     "label": "SU_MATCHED_S106",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S100",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S100"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S101",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S101"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S102",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S102"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S103",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S103"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S104",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S104"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S105",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S105"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_FAILED_S106",
  //     "label": "SU_MSG_SEND_CHECK_FAILED_S106"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S100",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S100"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S101",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S101"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S102",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S102"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S103",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S103"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S104",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S104"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S105",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S105"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_PASSED_S106",
  //     "label": "SU_MSG_SEND_CHECK_PASSED_S106"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S100",
  //     "label": "SU_MSG_SEND_CHECK_S100",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S101",
  //     "label": "SU_MSG_SEND_CHECK_S101",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S102",
  //     "label": "SU_MSG_SEND_CHECK_S102",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S103",
  //     "label": "SU_MSG_SEND_CHECK_S103",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S104",
  //     "label": "SU_MSG_SEND_CHECK_S104",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S105",
  //     "label": "SU_MSG_SEND_CHECK_S105",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_CHECK_S106",
  //     "label": "SU_MSG_SEND_CHECK_S106",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S100",
  //     "label": "SU_MSG_SEND_FAILED_S100"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S101",
  //     "label": "SU_MSG_SEND_FAILED_S101"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S102",
  //     "label": "SU_MSG_SEND_FAILED_S102"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S103",
  //     "label": "SU_MSG_SEND_FAILED_S103"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S104",
  //     "label": "SU_MSG_SEND_FAILED_S104"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S105",
  //     "label": "SU_MSG_SEND_FAILED_S105"
  //   }, {
  //     "id": "SU_MSG_SEND_FAILED_S106",
  //     "label": "SU_MSG_SEND_FAILED_S106"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S100",
  //     "label": "SU_MSG_SEND_PASSED_S100"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S101",
  //     "label": "SU_MSG_SEND_PASSED_S101"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S102",
  //     "label": "SU_MSG_SEND_PASSED_S102"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S103",
  //     "label": "SU_MSG_SEND_PASSED_S103"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S104",
  //     "label": "SU_MSG_SEND_PASSED_S104"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S105",
  //     "label": "SU_MSG_SEND_PASSED_S105"
  //   }, {
  //     "id": "SU_MSG_SEND_PASSED_S106",
  //     "label": "SU_MSG_SEND_PASSED_S106"
  //   }, {
  //     "id": "SU_MSG_SEND_S100",
  //     "label": "SU_MSG_SEND_S100",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S101",
  //     "label": "SU_MSG_SEND_S101",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S102",
  //     "label": "SU_MSG_SEND_S102",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S103",
  //     "label": "SU_MSG_SEND_S103",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S104",
  //     "label": "SU_MSG_SEND_S104",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S105",
  //     "label": "SU_MSG_SEND_S105",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_MSG_SEND_S106",
  //     "label": "SU_MSG_SEND_S106",
  //     "color": "blue"
  //   }, {
  //     "id": "SU_RECYCLE_BIN",
  //     "label": "SU_RECYCLE_BIN"
  //   }],
  //   edges: [{
  //     "source": "AUD_MATCHED",
  //     "target": "SU_MATCHED_S100",
  //     "label": "0",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "AUD_MATCHED",
  //     "target": "SU_MATCHED_S101",
  //     "label": "1",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "RECYCLE_BIN",
  //     "target": "ROOT",
  //     "label": "2",
  //     "color": "black"
  //   }, {
  //     "source": "ROOT",
  //     "target": "AUD_MATCHED",
  //     "label": "3",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S100",
  //     "target": "SU_DELAY_END_S100",
  //     "label": "4",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S100",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "5",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S101",
  //     "target": "SU_DELAY_END_S101",
  //     "label": "6",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S101",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "7",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S102",
  //     "target": "SU_DELAY_END_S102",
  //     "label": "8",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S102",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "9",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S103",
  //     "target": "SU_DELAY_END_S103",
  //     "label": "10",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S103",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "11",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S104",
  //     "target": "SU_DELAY_END_S104",
  //     "label": "12",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "13",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S105",
  //     "target": "SU_DELAY_END_S105",
  //     "label": "14",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "15",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S106",
  //     "target": "SU_DELAY_END_S106",
  //     "label": "16",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_BEGIN_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "17",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S100",
  //     "target": "SU_MSG_SEND_CHECK_S100",
  //     "label": "18",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S101",
  //     "target": "SU_MSG_SEND_CHECK_S101",
  //     "label": "19",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S102",
  //     "target": "SU_MSG_SEND_CHECK_S102",
  //     "label": "20",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S103",
  //     "target": "SU_MSG_SEND_CHECK_S103",
  //     "label": "21",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S104",
  //     "target": "SU_MSG_SEND_CHECK_S104",
  //     "label": "22",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S105",
  //     "target": "SU_MSG_SEND_CHECK_S105",
  //     "label": "23",
  //     "color": "black"
  //   }, {
  //     "source": "SU_DELAY_END_S106",
  //     "target": "SU_MSG_SEND_CHECK_S106",
  //     "label": "24",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S100",
  //     "target": "SU_DELAY_BEGIN_S100",
  //     "label": "25",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S101",
  //     "target": "SU_DELAY_BEGIN_S101",
  //     "label": "26",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S102",
  //     "target": "SU_DELAY_BEGIN_S102",
  //     "label": "27",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S103",
  //     "target": "SU_DELAY_BEGIN_S103",
  //     "label": "28",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S104",
  //     "target": "SU_DELAY_BEGIN_S104",
  //     "label": "29",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S105",
  //     "target": "SU_DELAY_BEGIN_S105",
  //     "label": "30",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MATCHED_S106",
  //     "target": "SU_DELAY_BEGIN_S106",
  //     "label": "31",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S100",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "32",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S101",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "33",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S102",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "34",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S103",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "35",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "36",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "37",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_FAILED_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "38",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S100",
  //     "target": "SU_MSG_SEND_S100",
  //     "label": "39",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S101",
  //     "target": "SU_MSG_SEND_S101",
  //     "label": "40",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S102",
  //     "target": "SU_MSG_SEND_S102",
  //     "label": "41",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S103",
  //     "target": "SU_MSG_SEND_S103",
  //     "label": "42",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S104",
  //     "target": "SU_MSG_SEND_S104",
  //     "label": "43",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S105",
  //     "target": "SU_MSG_SEND_S105",
  //     "label": "44",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_PASSED_S106",
  //     "target": "SU_MSG_SEND_S106",
  //     "label": "45",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S100",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S100",
  //     "label": "46",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S100",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S100",
  //     "label": "47",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S100",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "48",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S101",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S101",
  //     "label": "49",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S101",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S101",
  //     "label": "50",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S101",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "51",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S102",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S102",
  //     "label": "52",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S102",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S102",
  //     "label": "53",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S102",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "54",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S103",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S103",
  //     "label": "55",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S103",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S103",
  //     "label": "56",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S103",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "57",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S104",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S104",
  //     "label": "58",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S104",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S104",
  //     "label": "59",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "60",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S105",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S105",
  //     "label": "61",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S105",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S105",
  //     "label": "62",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "63",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S106",
  //     "target": "SU_MSG_SEND_CHECK_FAILED_S106",
  //     "label": "64",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S106",
  //     "target": "SU_MSG_SEND_CHECK_PASSED_S106",
  //     "label": "65",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_CHECK_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "66",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S100",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "67",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S101",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "68",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S102",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "69",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S103",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "70",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "71",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "72",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_FAILED_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "73",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S100",
  //     "target": "SU_MATCHED_S102",
  //     "label": "74",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S100",
  //     "target": "SU_MATCHED_S103",
  //     "label": "75",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S101",
  //     "target": "SU_MATCHED_S106",
  //     "label": "76",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S102",
  //     "target": "SU_MATCHED_S105",
  //     "label": "77",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S103",
  //     "target": "SU_MATCHED_S104",
  //     "label": "78",
  //     "color": "LightGrey"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "79",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "80",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_PASSED_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "81",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S100",
  //     "target": "SU_MSG_SEND_FAILED_S100",
  //     "label": "82",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S100",
  //     "target": "SU_MSG_SEND_PASSED_S100",
  //     "label": "83",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S100",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "84",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S101",
  //     "target": "SU_MSG_SEND_FAILED_S101",
  //     "label": "85",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S101",
  //     "target": "SU_MSG_SEND_PASSED_S101",
  //     "label": "86",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S101",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "87",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S102",
  //     "target": "SU_MSG_SEND_FAILED_S102",
  //     "label": "88",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S102",
  //     "target": "SU_MSG_SEND_PASSED_S102",
  //     "label": "89",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S102",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "90",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S103",
  //     "target": "SU_MSG_SEND_FAILED_S103",
  //     "label": "91",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S103",
  //     "target": "SU_MSG_SEND_PASSED_S103",
  //     "label": "92",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S103",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "93",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S104",
  //     "target": "SU_MSG_SEND_FAILED_S104",
  //     "label": "94",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S104",
  //     "target": "SU_MSG_SEND_PASSED_S104",
  //     "label": "95",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S104",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "96",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S105",
  //     "target": "SU_MSG_SEND_FAILED_S105",
  //     "label": "97",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S105",
  //     "target": "SU_MSG_SEND_PASSED_S105",
  //     "label": "98",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S105",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "99",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S106",
  //     "target": "SU_MSG_SEND_FAILED_S106",
  //     "label": "100",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S106",
  //     "target": "SU_MSG_SEND_PASSED_S106",
  //     "label": "101",
  //     "color": "black"
  //   }, {
  //     "source": "SU_MSG_SEND_S106",
  //     "target": "SU_RECYCLE_BIN",
  //     "label": "102",
  //     "color": "black"
  //   }, {
  //     "source": "SU_RECYCLE_BIN",
  //     "target": "RECYCLE_BIN",
  //     "label": "103",
  //     "color": "black"
  //   }]
  // };
  data = {
    "nodes": [{
      "id": "AUD_MATCHED",
      "label": "AUD_MATCHED",
      "color": "blue"
    }, {
      "id": "BEGIN_CONVERT_CALC",
      "label": "BEGIN_CONVERT_CALC",
      "color": "blue"
    }, {
      "id": "CONVERT_END",
      "label": "CONVERT_END"
    }, {
      "id": "MSG_SEND",
      "label": "MSG_SEND",
      "color": "blue"
    }, {
      "id": "MSG_SEND_CHECK",
      "label": "MSG_SEND_CHECK",
      "color": "blue"
    }, {
      "id": "MSG_SEND_CHECK_FAILED",
      "label": "MSG_SEND_CHECK_FAILED"
    }, {
      "id": "MSG_SEND_CHECK_PASSED",
      "label": "MSG_SEND_CHECK_PASSED"
    }, {
      "id": "MSG_SEND_FAILED",
      "label": "MSG_SEND_FAILED"
    }, {
      "id": "MSG_SEND_PASSED",
      "label": "MSG_SEND_PASSED"
    }, {
      "id": "ROOT",
      "label": "ROOT",
      "color": "red"
    }],
    "edges": [{
      "source": "AUD_MATCHED",
      "target": "MSG_SEND_CHECK",
      "label": "0",
      "color": "black"
    }, {
      "source": "BEGIN_CONVERT_CALC",
      "target": "CONVERT_END",
      "label": "1",
      "color": "black"
    }, {
      "source": "MSG_SEND",
      "target": "MSG_SEND_FAILED",
      "label": "2",
      "color": "black"
    }, {
      "source": "MSG_SEND",
      "target": "MSG_SEND_PASSED",
      "label": "3",
      "color": "black"
    }, {
      "source": "MSG_SEND_CHECK",
      "target": "MSG_SEND_CHECK_FAILED",
      "label": "4",
      "color": "black"
    }, {
      "source": "MSG_SEND_CHECK",
      "target": "MSG_SEND_CHECK_PASSED",
      "label": "5",
      "color": "black"
    }, {
      "source": "MSG_SEND_CHECK_PASSED",
      "target": "MSG_SEND",
      "label": "6",
      "color": "black"
    }, {
      "source": "MSG_SEND_PASSED",
      "target": "BEGIN_CONVERT_CALC",
      "label": "7",
      "color": "black"
    }, {
      "source": "ROOT",
      "target": "AUD_MATCHED",
      "label": "8",
      "color": "black"
    }]
  };
}

export default {
  namespace: 'customFlow',
  state: new CustomFlowModel(),
  reducers: {
    setModal(state, {payload: isShow}) {
      if (!isShow) {
        return {...state, showModal: isShow, selectedItem: null};
      }
      return {...state, showModal: isShow};
    },
    delete(state, {payload: key}) {
      const s = state.items.filter(item => item.key !== key);
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state, items: s};
    },
    changeStatus(state, {payload: item}) {
      state.items.forEach((o, index) => {
        if (o.key === item.key) {
          state.items.splice(index, 1, item);
        }
      })
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state};
    },
    submit(state, {payload: item}) {
      if (item.key) {
        state.items.forEach((o, index) => {
          if (o.key === item.key) {
            state.items.splice(index, 1, item);
          }
        })
      } else {
        state.selectedItem = item;
        state.selectedItem.key = Math.floor(Math.random() * 100);
        state.items.unshift(state.selectedItem);
      }
      window.localStorage.setItem('g6', JSON.stringify(state.items));
      return {...state, showModal: false, selectedItem: null};
    },
    edit(state, {payload: item}) {
      return {...state, selectedItem: item, showModal: true};
    },
    load(state, {payload: items}) {
      const db = window.localStorage.getItem('g6');
      if (db) {
        return {...state, items: JSON.parse(db)};
      } else {
        window.localStorage.setItem('g6', JSON.stringify(items));
      }
      return {...state, items: items};
    }
  },
  effects: {
    // 异步加载
    * query(_, {call, put, select}) {
      const response = yield call(queryAll);
      yield put({type: 'load', payload: response.data.data});
      const items = yield select(state => state.g6.items);
      console.log('获取到的数据条数：', items.length);
      return items;
    }
  }
} as Model<CustomFlowModel>;
