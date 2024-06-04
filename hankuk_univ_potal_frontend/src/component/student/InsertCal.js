import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';

const InsertCal = () => {
    const categori = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        fontSize: "larger",
        textAlign: "left",
        color: "#4952A9"
    }
    const navigate = useNavigate();

    const [formValues, setFormValues] = React.useState({
        start: null,
        end: null,
        title: '',
        groupId:'',
        bgColor:'',
        content: '',
        place:'',
        allDay:false
    });

    // 날짜
    const handleDateChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    // Input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCheckChange = (event) => {
        setFormValues({ ...formValues, allDay: event.target.checked });
    };

    // select
    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        
        let newBgColor = '';
        switch (value) {
            case 'S':
                newBgColor = '#F7D8FC';
                break;
            case 'P':
                newBgColor = '#FCFE9C';
                break;
            case 'H':
                newBgColor = '#B6C6EE';
                break;
            case 'E':
                newBgColor = '#B6EED3';
                break;
            default:
                newBgColor = '';
        }
        

        setFormValues({
            ...formValues,
            [name]: value,
            bgColor: newBgColor
        });
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("start", formValues.start);
        formData.append("end", formValues.end);
        formData.append("title", formValues.title);
        formData.append("groupId", formValues.groupId);
        formData.append("content", formValues.memo);
        formData.append("bgColor", formValues.bgColor);
        formData.append("place", formValues.place);
        formData.append("allDay", formValues.allDay)

        axios.post('http://localhost:8090/calInsert', formData)
            .then(res => {
                console.log(res.data);
                navigate('/my-potal/calendar')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>일정 등록</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "100vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 일정 관리 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>일정등록</b></Typography>
                </Typography>
                <form onSubmit={submit}>
                    <Grid container spacing={1} style={{ padding: "20px", display: 'flex' }}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>

                            <div style={{ justifyContent: 'column', display: 'flex', alignItems: 'center', padding: '50px 0px 50px' }}>
                                <Grid item xs={2}>
                                    <div style={categori}>일시</div>
                                </Grid>
                                <Grid item xs={7} style={{ justifyContent: 'column', display: 'flex', alignItems: 'center'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="시작 일자"
                                                value={formValues.start}
                                                onChange={(newValue) => handleDateChange('start', newValue)}
                                                id="start"
                                                name="start"
                                                style={{width:'200px'}}
                                            />
                                            <DatePicker
                                                label="종료 일자"
                                                value={formValues.end}
                                                onChange={(newValue) => handleDateChange('end', newValue)}
                                                id="end"
                                                name="end"
                                                style={{width:'150px'}}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider> &nbsp;&nbsp;&nbsp;
                                </Grid>
                                {/* <Grid item xs={2}> */}
                                    <Input type="checkbox" value={formValues.allDay} onChange={handleCheckChange} name="allDay" id="allDay" />&nbsp;&nbsp; 하루종일
                                {/* </Grid> */}
                            </div>

                            <div style={{ justifyContent: 'column', display: 'flex', alignItems: 'center', paddingBottom: '50px' }}>
                                <Grid item xs={3}>
                                <div style={categori}>제목</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="일정명"
                                        type="text"
                                        value={formValues.title}
                                        onChange={handleInputChange}
                                        style={{ height: '55px', backgroundColor: '#E5E5E8' }}
                                    />
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={categori}>장소</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <Input type="text" id="place" name="place" 
                                           placeholder='장소'
                                           onChange={handleInputChange} 
                                           style={{ height: '55px', backgroundColor: '#E5E5E8' }} />
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }} >
                                    <div style={categori}>분류</div>
                                </Grid>
                                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Input
                                        id="groupId"
                                        name="groupId"
                                        type="select"
                                        value={formValues.type}
                                        onChange={handleSelectChange}
                                        style={{ height: '55px', backgroundColor: '#E5E5E8' }}
                                    >
                                        <option>선택하세요.</option>
                                        <option value="S">학교</option>
                                        <option value="P">약속</option>
                                        <option value="H">과제</option>
                                        <option value="E">시험</option>
                                    </Input>
                                </Grid>
                            </div>
                            <div style={{ justifyContent: 'column', display: 'flex', paddingBottom: '50px' }}>
                                <Grid item xs={2}>
                                    <div style={categori}>메모</div>
                                </Grid>
                                <Grid item xs={10} style={{ justifyContent: 'column', display: 'flex', alignItems: 'center' }}>
                                    <Input
                                        id="memo"
                                        name="memo"
                                        type="textarea"
                                        placeholder='부가사항을 적어주세요'
                                        value={formValues.memo}
                                        onChange={handleInputChange}
                                        style={{ height: '230px', backgroundColor: '#E5E5E8' }}
                                    />
                                </Grid>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" style={{ backgroundColor: '#1F3468' }}><b>일정 등록</b></Button>
                            </div>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default InsertCal;