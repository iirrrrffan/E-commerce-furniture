import React from 'react';
import banner from '../Assets/Aset/banner.jpg';
import bedroom from '../Assets/Aset/bedroom.png';
import kitchen from '../Assets/Aset/kitchen.png';
import office from '../Assets/Aset/office.png';
import kidsroom from '../Assets/Aset/childrenroom.png';
import dininghall from '../Assets/Aset/dinninghall.png';
import Navigationbar from '../Navigationbar';
import Foot from './Foot';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navi=useNavigate()
  return (
    <div>
      <div className="container-fluid">
        <Navigationbar/>
          <img src={banner} className='pb-5' style={{ width: "100%" }} alt="Banner" />
      </div>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-2"  >
            <img src={bedroom} className="img-thumbnail" alt="Bedroom" onClick={()=>navi("/bedroom")} />
            Bedroom
          </div>
          <div className="col-sm-6 col-md-2">
            <img src={kitchen} className="img-thumbnail" alt="Kitchen" onClick={()=>navi("/kitchen")} />
            Kitchen
          </div>
          <div className="col-sm-6 col-md-2">
            <img src={office} className="img-thumbnail" alt="Office" onClick={()=>navi("/office")} />
            Office
          </div>
          <div className="col-sm-6 col-md-2">
            <img src={kidsroom} className="img-thumbnail" alt="Children's Room" onClick={()=>navi("/childrenroom")} />
            Kids Room
          </div>
          <div className="col-sm-6 col-md-2">
            <img src={dininghall} className="img-thumbnail " alt="Dining Hall" onClick={()=>navi("/dininghall")} />
            Dining Hall
          </div>
        </div>
      </div>
    
      <Foot/>
    </div>
  );
};

export default Home;
