# 2018DW   
react - django   
   
# REFERENCE PAGE   
https://reactjs.org/tutorial/tutorial.html   
https://v0.material-ui.com/#/   
https://react-bootstrap.github.io/   
https://grommet.io/   
https://ant.design/docs/react/introduce   
https://blueprintjs.com/   
https://github.com/JedWatson/react-codemirror   
https://reactjs.org/docs/events.html   
https://www.google.com/doodles/celebrating-50-years-of-kids-coding   
      
   
`createuser -U postgres -P -I -E django`  
*user-django-password:xsi123456*

`createdb -E UTF-8 -O django -U postgres djangodb`   

`psql -U django -W -h localhost djangodb`

`dropdb -U django djangodb`

`nginx -s quit`

```
gunicorn --daemon --workers 3 --bind unix:/home/kang/2018DW/back.sock back.wsgi
gunicorn --daemon --workers 3 --bind unix:/home/kang/2018DW/back.sock back.wsgi --error-logfile ~/gunicorn-error.log
```

       
# FIX List   
Backend use Docker   
Api request error fix solution-> js timer api request 5times   
fix login flow      
   
pip install   
pip install pycryptodome   
   

# Project Members   
 - Monta   
 - Ikeda   
 - Kang

# Version   
 * 0.1.0    
 - Feature
    - Core
        Course Management System
        User Managemenet System
        User Authentication System
        Source Code Excute System
        Docker Excute System
        Local File Storage System
    - After Patch
        Help System
        User Communication System
        Ad Management System
        Fix Bugs
