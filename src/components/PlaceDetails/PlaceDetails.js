import React from 'react'
import { Box, Typography, Button, Card,CardMedia, CardActions, Chip, CardContent,  } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import uesStyles from "./Styles";


const PlaceDetails = ({place, selected, refProp, i}) => {
     const {name, photo, price, ranking, rating,num_reviews} = place;
     const classes = uesStyles();
     if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    return (
       <Card elevation={6} key ={i}>
            <CardMedia 
                style={{height:300}}
                image={photo ? photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}    
                title={name}

                />
            <CardContent>
                <Typography gutterBottom variant="h5">{name}</Typography>
                <Box display="flex" justifyContent="space-between"> 
                    <Rating  variant="subtitle1">{rating}</Rating> 
                    <Typography gutterBottom variant="subtitle1">out of {num_reviews}</Typography> 
                </Box>    
                <Box display="flex" justifyContent="space-between"> 
                    <Typography  variant="subtitle1">Prices:</Typography> 
                    <Typography gutterBottom variant="subtitle1">{price}</Typography> 
                </Box>
                <Box display="flex" justifyContent="space-between"> 
                    <Typography  variant="subtitle1">Ranking:</Typography> 
                    <Typography gutterBottom variant="subtitle2">{ranking}</Typography> 
                </Box>
                {place?.awards?.map((award)=>(
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_image}/>  
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map((name)=>(
                    <Chip key={name} size="small" Label={name} className={classes.chip}/>
                 ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOn/>{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
       </Card> 
    )
}

export default PlaceDetails
