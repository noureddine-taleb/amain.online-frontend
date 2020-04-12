coding convention:
    - DRY code
    - separate all configuration in environement folder
    - define exception handler in specific location
    - route names should be compatible with components's one
    - component should do simple task and services should do the heavy lifting and contain
      business logic 
    - define models for each resource
    - provide services in app.model
    - service for each resource
    - component names should reference the manipulated resource : words are seperated with "-"
    - resource name should be the var
    - test everythink with e2e and karma