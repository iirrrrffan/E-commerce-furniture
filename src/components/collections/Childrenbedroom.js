import React, { useContext } from 'react'
import { userContext } from '../../App'
import Navigationbar from '../Navigationbar'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Childrenbedroom = () => {
  const {product}=useContext(userContext)
  const child=product.filter((item)=>item.type==='children room')
  const navi=useNavigate()
  return (
    <div>
      <Navigationbar/>
      <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>

    {child.map((item) => (
        <div  className='d-flex align-items-center justify-content-center flex-wrap'>
          <Button variant="primary" onClick={()=>navi(`/view/${item.Id}`)}>
            <Card className="shadow p-3 m-2 bg-body-tertiary rounded"
                style={{
                    width: "15rem",
                    height: "28rem",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    
                }}>
                <Card.Img variant="top" src={item.Image} style={{ height: '13rem', width: '9rem' }} />
                <Card.Body>
                    <Card.Title>{item.ProductName}</Card.Title>
                    <Card.Text> Old Price <del>{item.OldPrice}</del></Card.Text>
                    <Card.Text>Offer Price {item.Price}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            </Button>
        </div>
    ))}
    </div>
    </Container>

    </div>
  )
}

export default Childrenbedroom