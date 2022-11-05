import React, {useEffect, useState} from "react";
import {generateSecretKey} from '@stacks/wallet-sdk';
import {Avatar, Box, Button, Typography} from "@mui/material";


const CreateMenm = () => {

  const [mnem, setMnem] = useState([]);
  const [paramMnem, setParamMnem] = useState('');
  useEffect(() => {
    createMnem();
  }, [])

  const createMnem = (len = 128) => {
    // console.log(generateSecretKey(len));
    let menm = generateSecretKey(len);
    setParamMnem(menm);
    console.log('menm', menm)
    let wordList = menm.split(' ');
    setMnem(wordList);
  }

  const goToNext = async () => {
    // goTo(CONFIRM_MENM, {params: mnem.toString()});
    console.log('goToNext');
  }
  return (
    <>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Avatar
            src="../img/LOGO.png"
            sx={{width: 60, height: 60, margin: '0 auto'}}
          />
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            지갑이 생성되었습니다.
            <br/>
            다음의 복구구문을 꼭 기록해두세요!
          </Typography>
        </Box>
      </Box>

      <Box sx={{margin: '20px auto', textAlign: 'center'}}>
        {
          params
        }
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          onClick={goToNext}
        >
          지갑열기
        </Button>
      </Box>
    </>
  )
}

export default CreateMenm;