# platziverse-mqtt

## `agent/connected`

```javascript
{
    agent: {
        uuid, // auto generar
        username, // definir por configuracion
        name, // difinir por configuracion
        hostname, // obtener del sitema operativo
        pid // obtener del proceso
    }
}
```

## `agent/disconnected`

```javascript
{
    agent: {
        uuid
    }
}
```

## `agent/message`

```javascript
{
    agent,
    metrics: [
        {
            type,
            value
        }
    ],
    timestamp // generar cuando creamos el mensaje
}
```
