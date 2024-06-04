import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import ModalTest from "./CalModal";
import '../../App.css';
import './css/FullCalendar.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router";

const renderEventContent = (eventInfo) => {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    );
};

const ModalCalendar = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const handleEventClick = (arg) => {
        setSelectedEvent(arg.event);
        console.log(arg.event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    useEffect(() => {
        axios.get(`http://localhost:8090/calendar`)
            .then(res => {
                
                const getGroupName = (groupId) => {
                    switch (groupId) {
                        case 'S':
                            return '학교';
                        case 'H':
                            return '과제';
                        case 'E':
                            return '시험';
                        case 'P':
                            return '약속';
                    }
                };

                const formattedEvents = res.data.map(event => {
                    const isAllDay = event.allDay;
                    if (isAllDay) {
                        return {
                            title: event.title,
                            start: new Date(event.start),
                            end: new Date(event.end),
                            backgroundColor: event.bgColor,
                            textColor: '#000000',
                            borderColor: event.bgColor,
                            allDay: isAllDay,
                            extendedProps: {
                                content: event.content,
                                type: getGroupName(event.groupId),
                                place: event.place,
                                writer: event.writer
                            }
                        };
                    } else {
                        return {
                            title: event.title,
                            start: new Date(event.start),
                            end: new Date(event.end),
                            backgroundColor: event.bgColor,
                            textColor: '#000000',
                            borderColor: event.bgColor,
                            extendedProps: {
                                content: event.content,
                                type: getGroupName(event.groupId),
                                place: event.place,
                                writer: event.writer
                            }
                        };
                    }
                });
                setEvents(formattedEvents);
                console.log(formattedEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    // '일' 제거 해주는 함수 
    const daycheck = (info) => {
        var number = document.createElement("a");
        number.classList.add("fc-daygrid-day-number");
        number.innerHTML = info.dayNumberText.replace("일", "");
        if (info.view.type === "dayGridMonth") {
            return {
                html: number.outerHTML
            };
        }
        return {
            domNodes: []
        };
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>일정 조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "110vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 일정 관리 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>일정 조회</b></Typography>
                </Typography>
                <Grid container>
                <Grid item xs={2}></Grid>
                
                <Grid item xs={8} >
                    <div style={{ height: 800}} className="App">
                    <div style={{ display: "flex", justifyContent: "flex-end", padding: "0px 0px 30px 50px" }}>
                        <Button variant="contained" style={{ backgroundColor: '#1F3468' }} onClick={()=>{navigate('/my-potal/insert-calendar')}} >일정 등록</Button>
                    </div>
                    <FullCalendar
                         headerToolbar={{
                            left:"prev",
                            center: "title",
                            right:"next"
                          }}
                        defaultView="dayGridMonth"
                        locale={'ko'}
                        dayCellContent={daycheck}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        // events={[
                        //     { title: '개어렵다', date: '2024-06-15', content: '밥먹기', place: '대운동장', type: '학업' },
                        //     { title: '최프 발표', date: '2024-06-28', content: '최프 발표', place: 'kosta', type: '학업' }
                        // ]}
                        events={events}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                        dayMaxEventRows={true}
                        dayMaxEvents={2}
                        />
                    {selectedEvent && (
                        <ModalTest open={modalOpen}
                        close={handleCloseModal}
                        header={selectedEvent.title}
                        start={selectedEvent.start ? selectedEvent.start.toISOString().split('T')[0] : ''}
                        end={selectedEvent.end ? "~ " + selectedEvent.end.toISOString().split('T')[0] : ''}
                        content={selectedEvent.extendedProps.content}
                        place={selectedEvent.extendedProps.place}
                        type={selectedEvent.extendedProps.type}
                        >
                        </ModalTest>
                    )}
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                    </Grid>
            </Paper>
        </Grid>
    )
}

export default ModalCalendar;