import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormatStrikethroughOutlined } from '@mui/icons-material';


const validationSchema = yup.object({
    address: yup
      .string('Enter hospital address')
      .required('Address is required'),
    managerName: yup
      .string('Enter hospital manager name')
      .required('Manager name is required'),
    name: yup
      .string('Enter hospital name')
      .required('Name is required'),
    healthcareIndustryNumber: yup
      .string('Enter hospital Healthcare Industry Number')
      .required('Healthcare Industry Number is required'),
    hospitalCode: yup
      .string('Enter a hospital Code')
      .required('Hospital Code is required'),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialFormValues = {
  name: '',
  address: '',
  managerName: '',
  hospitalCode: '',
  healthcareIndustryNumber: '',
};

export default function HospitalModal({ id, handleClose, open }) {
  let hospitalId = id ?? -1;
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState(null);

  async function editOrCreateHospital(values) {
    let formData = new FormData();
    formData.append('id', hospital?.id ?? -1);
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('managerName', values.managerName);
    formData.append('hospitalCode', values.hospitalCode);
    formData.append('healthcareIndustryNumber', values.healthcareIndustryNumber);

    // TODO: Move these into a service
    await fetch("/api/hospitals/create",
        {
            body: formData,
            method: "post"
        });
  };

  function closeModal() {
    handleClose();
    setHospital(null);
  };

  useEffect(() => {
    formik.values.name = "";
    formik.values.address = "";
    formik.values.managerName = "";
    formik.values.hospitalCode = "";
    formik.values.healthcareIndustryNumber = "";
  }, [open]);

  useEffect(() => {
    fetch("/api/hospitals/find?id=" + hospitalId, { 
      method: 'GET', 
      headers: {
        Accept: 'application/json',
      }}).then(response => {
        if (response.ok) {
          response.json().then(json => {
            formik.initialValues.name = json.name;
            formik.initialValues.address = json.address;
            formik.initialValues.managerName = json.managerName;
            formik.initialValues.hospitalCode = json.hospitalCode;
            formik.initialValues.healthcareIndustryNumber = json.healthcareIndustryNumber;
            setHospital(json);
            setLoading(false);
          });
        }
      }).catch(() => {
        setLoading(false);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      editOrCreateHospital(values);
      closeModal();
      resetForm();
    },
  });

  return (
    <div>
      <Dialog open={open}>
        {loading ? 
          <CircularProgress />  : 
          <>
            <DialogTitle>{hospital ? "Edit" : "Create"} Hospital</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <DialogContentText>
                  By adding a new or editing hospital it will be able to registry immediately. Remaining update will happen occasionally.
                </DialogContentText>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="managerName"
                    label="Manager Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formik.values.managerName}
                    onChange={formik.handleChange}
                    error={formik.touched.managerName && Boolean(formik.errors.managerName)}
                    helperText={formik.touched.managerName && formik.errors.managerName}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={hospital?.name ?? ""}
                    variant="standard"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="healthcareIndustryNumber"
                    label="Healthcare Industry Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formik.values.healthcareIndustryNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.healthcareIndustryNumber && Boolean(formik.errors.healthcareIndustryNumber)}
                    helperText={formik.touched.healthcareIndustryNumber && formik.errors.healthcareIndustryNumber}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="hospitalCode"
                    label="Hospital Code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formik.values.hospitalCode}
                    onChange={formik.handleChange}
                    error={formik.touched.hospitalCode && Boolean(formik.errors.hospitalCode)}
                    helperText={formik.touched.hospitalCode && formik.errors.hospitalCode}
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="submit">{hospital ? "Edit" : "Create"}</Button>
              </DialogActions>
            </form>
            </>
          }
      </Dialog>
    </div>
  );
};