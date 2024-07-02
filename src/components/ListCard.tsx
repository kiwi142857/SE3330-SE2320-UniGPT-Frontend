import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import '../css/Home.css';

export default function ListCard({ link, avatar, name, description }: 
  { link: string, avatar: string, name: string, description: string }) {
  return (
    <Link href={link} style={{ textDecoration: 'none' }} >
      <Card className='bot-card' style={{ height: '100%' }}>
        <CardMedia 
          style={{ width: '70px', height: '70px', marginLeft: '4%'}}
          className='bot-card-media'
          component="img"
          image={avatar}
          alt="default"
        />
        <CardContent >
          <Typography className='bot-card-name'>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='bot-card-description'>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export function SelectListCard({
  link, avatar, name, description, selected, onSelectChange
}: {
  link: string, 
  avatar: string, 
  name: string, 
  description: string, 
  selected: boolean, 
  onSelectChange: (selected: boolean) => void
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card className='bot-card' style={{ height: '100%'}}>
        <div style={{ display: 'flex'}}>
          <Checkbox
            checked={selected}
            onChange={(event) => onSelectChange(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <div>
            <CardMedia
              style={{ width: '70px', height: '70px', marginLeft: '15%'}}
              className='bot-card-media'
              component="img"
              image={avatar}
              alt="default"
            />
            <CardContent>
              <Typography className='bot-card-name'>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className='bot-card-description'>
                {description}
              </Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </a>
  );
}