import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HospitalModal from './Modals';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://hospitals.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: [
        'Cool stuff',
        'Random feature',
        'Team feature',
        'Developer stuff',
        'Another one',
      ],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { hospitals: [], hospitalId: -1, openModal: false, loading: true };
    }

    componentDidMount() {
        this.getHospitals();
    }

    async getHospitals() {
        const response = await fetch('api/hospitals/all');
        const data = await response.json();
        this.setState({ hospitals: data, loading: false });
    }

    async deleteHospital(datum) {
        const response = await fetch('api/hospitals/delete?id=' + datum.id, { method: "DELETE" });
        this.getHospitals();
    }

    async editHospital(datum) {
        this.setState({ hospitalId: datum.id, openModal: true });
    }

    createHospital() {
        this.setState({ hospitalId: -1, openModal: true });
    }

    handleCloseModal() {
        this.setState({ openModal: false });
        this.getHospitals();
    }

    hospitalTableRender(hospitals) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1250 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><Typography variant="h6" gutterBottom>Address</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>Hospital Code</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>Manager Name</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>Name</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>Healthcare Industry Number</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom></Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hospitals.map(datum =>
                            <TableRow
                                key={datum.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {datum.address}
                                </TableCell>
                                <TableCell align="right">{datum.hospitalCode}</TableCell>
                                <TableCell align="right">{datum.managerName}</TableCell>
                                <TableCell align="right">{datum.name}</TableCell>
                                <TableCell align="right">{datum.healthcareIndustryNumber}</TableCell>
                                <TableCell align="right">
                                    <span onClick={() => this.editHospital(datum)}><IconButton aria-label="edit"><EditIcon /></IconButton></span>
                                    <span onClick={() => this.deleteHospital(datum)}><IconButton aria-label="delete"><DeleteIcon /></IconButton></span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    render() {
       let contents = this.state.loading
           ? <p><em>Loading...</em></p>
           : this.hospitalTableRender(this.state.hospitals);

       return (
           <div>
               <HospitalModal id={this.state.hospitalId} handleClose={() => this.handleCloseModal()} open={this.state.openModal}></HospitalModal>
               <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 10, pb: 8 }}>
                    
                    <div>
                        <Button variant="outlined" onClick={() => this.createHospital()}>Add Hospital</Button>
                    </div>
                    {contents}
                </Container>
                <Container
                    maxWidth="md"
                    component="footer"
                    sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                    }}
                >
                    <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map((item) => (
                            <li key={item}>
                                <Link href="#" variant="subtitle1" color="text.secondary">
                                {item}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </Grid>
                    ))}
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
           </div>
       );
  }
}
