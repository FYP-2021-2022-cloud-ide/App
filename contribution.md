# how to develop the frontend ? 

The first principle of the development is to separate it from the other environment. It is a standalone project. 

To do that, you need to disable all external api. Instead, you should use the test data. 

# how to run the project on your local computer

Make sure you have node js install and run this just after you clone the project.

```sh
npm install 
```

Then you should run `npm run dev` to start the project. But before you start the project, you should check the following:  

## disable authentication and api routing 

In the `server.ts`, express handle some authentication and api routing, you need to disable them as well. You need to enable the following block to mimic authentication. 

```tsx
//testing 
  server.all('*' ,  (req, res) => {
    res.cookie('sub', "mlkyeung");
    res.cookie('name', "Yeung Man Lung Ken ");
    res.cookie('email', "mlkyeung@connect.ust.hk");
    return handle(req, res);
  })
```

## disable all external api 

For example in `index.tsx`,

```tsx

// data fetching from API
    useEffect(()=>{
        const fetchCourses = async ()=>{
            const courses = await courseList(sub) 
            setCourses(courses)
        }
        const fetchContainers = async ()=>{
            const containers = await containerList(sub)
            setContainers(containers)
        }
        // fetchCourses()
        // fetchContainers()
    }, [])
```
The `fetchCourses()` and `fetchContainers()` need to be disabled. Then use your test data. 

### how to create fake testing data? 

The fake testing data should be correspond to the data structure of components props. 

#### the props type must be public 

```tsx 
interface course{
    sectionID: string
    courseCode: string
    section: string
    name: string
    sectionRole: string
    lastUpdateTime: string
}

export interface props{
    courses: course[]
}

const CoursesList = ({courses}:props)=>{
```

The code is in `CourseList.tsx`. The props is the type of the component and it should be published. 


```tsx
const data : props = { 
    courses : [
        {
            section : "12312321asda" , 
            sectionID : "123123" , 
            sectionRole : "student" , 
            name : "sdfosodfks" , 
            courseCode : "COMP1234" , 
            lastUpdateTime : "15 mins ago"
        },
        {
            section : "12312321asda" , 
            sectionID : "123123" , 
            sectionRole : "student" , 
            name : "sdfosodfks" , 
            courseCode : "COMP1234" , 
            lastUpdateTime : "15 mins ago"
        },{
  //...
```

Then you need to compose the data just like the struct you define for the component. For naming convention, the testing data file can be the same as the component name. 


## Note !

Actually there should be a better way of development which is to separate the testing environment (the environment with external api) and the development environment (simply internal).  That will require a bit of environment management but this should be in the future roadmap.

# practice 

1. You should create a new branch when developing a new feature, never merging directly to the main branch. You can do this by running command `git push origin manlung`.


# roadmap