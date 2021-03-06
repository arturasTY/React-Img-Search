import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from  'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ImageResults extends Component {
  render() {
    let imagesContent;
    const { images } = this.props;

    if(images) {
        imagesContent = (
            <GridList cols={3}>
                {images.map(img => (
                    <GridTile
                        title={img.tags}
                        key={img.id}
                        subtitle={
                            <span>by <strong>{img.user}</strong></span>
                        }
                        actionIcon={
                            <IconButton>
                                <ZoomIn color="white" />
                            </IconButton>
                        }
                    >
                        <img src={img.largeImageURL} alt=""/>
                    </GridTile>
                ))}
            </GridList>
        )
    } else {
        imagesContent = null;
    }

    return (
      <div>
        {imagesContent}
      </div>
    )
  }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}