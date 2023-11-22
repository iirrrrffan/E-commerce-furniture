import React from 'react';
import banner from '../Assets/Aset/banner.jpg';
import bedroom from '../Assets/Aset/bedroom.jpg';
import kitchen from '../Assets/Aset/kitchen.jpg';
import office from '../Assets/Aset/office.jpg';
import kidsroom from '../Assets/Aset/kidsroom.jpg';
import dininghall from '../Assets/Aset/dininghall.jpg';
import Navigationbar from '../Navigationbar';
import Foot from './Foot';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navi = useNavigate();

  return (
    <div>
      <div className="container-fluid">
        <Navigationbar />
        <img src={banner} className='pb-5' style={{ width: '100%' }} alt="Banner" />
      </div>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4 mb-4" style={{ textAlign: 'center' }}>
            <img src={bedroom} className="img-thumbnail" alt="Bedroom" onClick={() => navi("/bedroom")} />
            <p>Bedroom</p>
          </div>
          <div className="col-sm-6 col-md-4 mb-4" style={{ textAlign: 'center' }}>
            <img src={kitchen} className="img-thumbnail" alt="Kitchen" onClick={() => navi("/kitchen")} />
            <p>Kitchen</p>
          </div>
          <div className="col-sm-6 col-md-4 mb-4" style={{ textAlign: 'center' }}>
            <img src={office} className="img-thumbnail" alt="Office" onClick={() => navi("/office")} />
            <p>Office</p>
          </div>
          <div className="col-sm-6 col-md-4 mb-4" style={{ textAlign: 'center' }}>
            <img src={kidsroom} className="img-thumbnail" alt="Children's Room" onClick={() => navi("/childrenroom")} />
            <p>Kids Room</p>
          </div>
          <div className="col-sm-6 col-md-4 mb-4" style={{ textAlign: 'center' }}>
            <img src={dininghall} className="img-thumbnail" alt="Dining Hall" onClick={() => navi("/dininghall")} />
            <p>Dining Hall</p>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Home;
