"use client";

import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import moment from 'moment';
import ClientDataTable from "@/components/DataTable";
import api from "@/config/api";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "slot", headerName: "Slot", width: 100 },
  { field: "date", headerName: "Date", width: 150, renderCell(params) {
      return moment(params.row?.date).format('DD-MMM-YYYY hh:mm a')
  }, },
  { field: "duration", headerName: "Duration (mins)", width: 150 },
  { field: "amount", headerName: "Amount ($)", width: 120 },
  { field: "method", headerName: "Payment Method", width: 150 },
];

const SLOT_OPTIONS = Array.from({ length: 10 }, (_, i) => `SLOT-${100 + i * 7}`);

export default function ParkingsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(SLOT_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(30);
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("easypaisa");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const ratePer30 = 5;
  const amount = (duration / 30) * ratePer30;

  useEffect(() => {
    api.get("/parking").then((res) => {
      setRows(res.data);
    });
  }, []);

  const resetForm = () => {
    setStep(1);
    setSlot(SLOT_OPTIONS[0]);
    setDuration(30);
    setDate("");
    setMethod("easypaisa");
    setPhone("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/parking", {
        slot,
        duration,
        date,
        method,
        amount,
        paymentDetails:
          method === "easypaisa"
            ? { phone }
            : { cardNumber, expiry, cvv },
      });

      const res = await api.get("/parking");
      setRows(res.data);

      toast.success("Booking created successfully!");
      resetForm();
    } catch (error) {
      console.error("Booking failed:", error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-orange-600 text-xl">Parkings</h2>
        <Button variant="contained" className="!bg-orange-400" onClick={() => setOpen(true)}>
          New Booking
        </Button>
      </div>

      <ClientDataTable columns={columns} rows={rows} loading={loading}/>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Parking Booking</DialogTitle>
        <DialogContent className="flex flex-col gap-4 py-4">
          {step === 1 ? (
            <>
              <FormControl fullWidth>
                <InputLabel>Slot</InputLabel>
                <Select value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {SLOT_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Booking Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth>
                <InputLabel>Duration (mins)</InputLabel>
                <Select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                  {Array.from({ length: 33 }, (_, i) => (i + 1) * 30).map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="font-medium">
                Payment: <span className="font-semibold text-green-600">${amount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                  <MenuItem value="easypaisa">Easypaisa</MenuItem>
                  <MenuItem value="debit_card">Debit Card</MenuItem>
                </Select>
              </FormControl>

              {method === "easypaisa" ? (
                <TextField
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              ) : (
                <>
                  <TextField
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    fullWidth
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {step === 1 ? (
            <Button onClick={() => setStep(2)} variant="contained" disabled={!duration || !slot || !date}>
              Continue to Payment
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="contained" disabled={loading || method == 'easypaisa' ? !phone : !cardNumber || !expiry || !cvv}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
