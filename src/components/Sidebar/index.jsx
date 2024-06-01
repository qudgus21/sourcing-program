import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import Person3RoundedIcon from '@mui/icons-material/Person3Rounded';

const Sidebar = ({pages, setCurrentPage}) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickPageItem = (index) => {
    setCurrentPage(index);
    setActiveIndex(index);
  }

  return (
    <div className='shadow4'>
      <Drawer
        variant="permanent"
        sx={{
          width: '20%',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '20%', boxSizing: 'border-box', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16);'},
        }}
      >
        <List>
          {pages.map((text, index) => (
            <ListItem className='h-[50px] flex gap-[8px] items-center' button key={text} 
                      onClick={()=> {handleClickPageItem(index)}}
                      sx={{
                        color: activeIndex === index ? '#37B4ED' : 'inherit',
                        '& .MuiSvgIcon-root': {
                          color: activeIndex === index ? '#37B4ED' : 'inherit',
                        },
                        backgroundColor: activeIndex === index ? '#f0f0f0' : 'inherit',
                        '& .MuiSvgIcon-root': {
                          color: activeIndex === index ? '#37B4ED' : 'inherit',
                        },
                        '&:hover': {
                          color: '#37B4ED',
                          '& .MuiSvgIcon-root': {
                            color: '#37B4ED',
                          },
                        },
                      }}
            >
              {
                index === 0 && <AllInclusiveIcon/>
              }
              {
                index === 1 && <LanguageRoundedIcon/>
              }
              {
                index === 2 && <Person3RoundedIcon  />
              }
              <ListItemText primary={text} primaryTypographyProps={{fontWeight: 'bold'}}/>
            </ListItem> 
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;