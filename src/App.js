import React,{useEffect,useState} from 'react';
import{Form,Card,Image,Icon} from 'semantic-ui-react';
import './App.css';

function App() {

  const[name,setName] = useState('');
  const[userName,setUsernameName] = useState('');
  const[followers,setFollowers] = useState('');
  const[following,setfollowing] = useState('');
  const[repos,setRepos] = useState('');
  const[repoUrl,setRepourl] = useState('');
  const[avatar,setAvatar] = useState('');
  const[userInput,setUserinput] = useState('');
  const[error,setError] = useState(null);

  useEffect(()=>{
    fetch('https://api.github.com/users/example')
    .then(res=>res.json())
    .then(data=>{
      setData(data);
    });

  },[]);

  const setData=({name,login,followers,following,
    public_repos,repos_url,avatar_url})=>{
      setName(name);
      setUsernameName(login);
      setFollowers(followers);
      setfollowing(following);
      setRepos(public_repos);
      setRepourl(repos_url);
      setAvatar(avatar_url);


  };

  const handleSearch = (e)=>{
    setUserinput(e.target.value)
  };

  const handleSubmit=()=>{
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.message){
        setError(data.message)
      }else{
      setData(data);
      setError(null);
      }
    });
  };
  
  
  return (
    <div>
    <div className="navbar">Github Search</div>
    <div className="search">
      <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='github user'
              name='github user'
              // value={name}
              onChange={handleSearch}
            />
            
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
    </div>
    {error ?
    (<h1>{error}</h1>) :(
    <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{userName}</Card.Header>
            
            {/* <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description> */}
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repos} Repos
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} Following
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repoUrl} Repo url
            </a>
          </Card.Content>
        </Card>

    </div>
    ) }
    
      
    </div>
    
  );
}

export default App;
