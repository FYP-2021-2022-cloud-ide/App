# how to develop the frontend ? 

The first principle of the development is to separate it from the other environment. It is a standalone project. 

To do that, you need to disable all external api. Instead, you should use the test data. 

# how to run the project on your local computer

Make sure you have node js install and run this just after you clone the project.

```sh
npm install 
```

Then you should run `npm run dev` to start the project. But before you start the project, you should check the following:  

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

## disable authentication and api routing 

In the `server.ts`, express handle some authentication and api routing, you need to disable them as well. 

## Note !

Actually there should be a better way of development which is to separate the testing environment (the environment with external api) and the development environment (simply internal).  That will require a bit of environment management but this should be in the future roadmap.

# practice 

1. You should create a new branch when developing a new feature, never merging directly to the main branch. 


# roadmap