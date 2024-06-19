import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Paper, Typography, Grid, Breadcrumbs, Link, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Input, Table } from 'reactstrap';
import PersonIcon from '@mui/icons-material/Person';
import '../student/css/Mypage.css';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';
import React, { useEffect, useState } from 'react';
import { url } from '../../config/config';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyPage = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();

    // 이수 학기로 학년 구하기 
    const finSem = (finSem) => {
        const grade = Math.floor((finSem - 1) / 2 + 1);
        return `${grade}학년`;
    }
    const dataChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const [formValues, setFormValues] = useState({
        addr: member.addr,
        detailAddr: member.detailAddr,
        postCode: member.postCode,
        tel: member.tel,
        email: member.email,
        emailDo: member.emailDo,
    });

    
    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '비밀번호를 입력하세요',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                if ('1234' === password) {
                  return Swal.fire({
                    icon: 'success',
                    title: '비밀번호 확인됨'
                  });
                } else {
                  Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                }
              },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                  icon:'success',
                  title: '정보 수정 완료',
                  text: '입력하신 정보가 성공적으로 변경되었습니다.'
                });
                submit(e);
              }
          });
          

    }

    useEffect(() => {
        setFormValues({
            addr: member.addr,
            detailAddr: member.detailAddr,
            postCode: member.postCode,
            tel: member.tel,
            email: member.email,
            emailDo: member.emailDo
        });
    }, [member]);

    const submit = (e) => {
        const formData = new FormData();
        formData.append("id", member.id);
        formData.append("addr", formValues.addr);
        formData.append("detailAddr", formValues.detailAddr);
        formData.append("postCode", formValues.postCode);
        formData.append("tel", formValues.tel);
        formData.append("email", formValues.email);
        formData.append("emailDo", formValues.emailDo);

        axios.post(`${url}/stdInfoModify`, formData, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                navigate('/student/mypage')
                // window.location.reload(); 
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>마이페이지</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>상세 보기</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                    <form onSubmit={submit}>
                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <div className='col-4'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">학번</div>
                                        <Input type="text" className='infoD' id='stdNo'
                                            value={member.id} disabled />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">전화번호</div>
                                        <Input type="text" className='infoD'
                                            value={formValues.tel} onChange={dataChange} name="tel" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">생년월일</div>
                                        <Input type="text" disabled className='infoD' value={member.birthday} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">학과</div>
                                        <Input type="text" className='infoD' value={member.majName} disabled />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이수학점</div>
                                        <Input type="text" disabled className='infoD' value={member.finCredit} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">우편번호</div>
                                        <Input type="text" className='infoD' value={formValues.postCode} onChange={dataChange} name="postCode" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">주소</div>
                                        <Input type="text" className='infoD' value={formValues.addr} onChange={dataChange} name="addr" />
                                    </div>

                                </div>

                                <div className='col-4' style={{ marginLeft: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이름</div>
                                        <Input type="text" disabled className='infoD' value={member.name} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이메일</div>
                                        <Input type="text" className='infoD' value={formValues.email} onChange={dataChange} name="email" />
                                        <Input type="select" className='infoD' value={formValues.emailDo} onChange={dataChange} name="emailDo" >
                                            <option>{member.emailDo}</option>
                                            <option>@naver.com</option>
                                            <option>@gmail.com</option>
                                            <option>@kakao.com</option>
                                            <option>@daum.net</option>
                                        </Input>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">학년</div>
                                        <Input type="text" disabled className='infoD' value={finSem(member.finSem)} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">지도교수</div>
                                        <Input type="text" disabled className='infoD' value={member.profName} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이수학기</div>
                                        <Input type="text" disabled className='infoD' value={member.finSem} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '49px' }}>
                                        <div className="col-3 ttext">상세주소</div>
                                        <Input type="text" className='infoD' value={formValues.detailAddr} onChange={dataChange} name="detailAddr" />
                                    </div>

                                </div>

                                <div className='col-4 personBG'>
                                    <PersonIcon className='personIcon' style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>
                            <div style={{ margin: '20px 0px 0px 360px' }}>
                                <Button style={{ backgroundColor: '#1F3468', color: 'white' }} onClick={alert}>수 정</Button>
                            </div>
                        </form>


                        <div style={{ margin: '30px 0px' }}>
                            <div className="categori">
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>비밀번호 변경</b></span>
                            </div>
                            <div style={{ padding: '22px 50px', fontSize: 'larger' }}>
                                비밀번호를 변경하시려면 <b style={{ color: 'blue', textDecoration: 'underline' }}>여기</b>를 클릭하시오
                            </div>
                        </div>

                        <div style={{ margin: '30px 0px' }}>
                            <div className="categori">
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>학적 변동사항</b></span>
                            </div>
                            <div style={{ padding: '10px 50px 30px', textAlign: 'center', fontSize: 'larger' }}>
                                <Table className="table" bordered>
                                    <thead>
                                        <tr>
                                            <th>일시</th>
                                            <th>학부(과)</th>
                                            <th>학번</th>
                                            <th>학년</th>
                                            <th>변동사항</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">2020.03.01</td>
                                            <td>컴퓨터공학과</td>
                                            <td>241001</td>
                                            <td>1학년</td>
                                            <td>입학</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default MyPage;