import React from 'react';
import { Button, Flex, Input, Space } from 'antd';

export default function PasswordInput({ password, setPassword, placeholder, size, disabled = false, showButton = true }){

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space direction="vertical" style = {{ margin: '10px auto 10px', width: '100%' }}>

      <Flex vertical = { false } >

        <Input.Password
          onChange = { event => setPassword(event.target.value) }
          placeholder = { placeholder }
          value = { password || '' }
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          size = { size }
          style = {{ marginRight: 10 }}
          disabled = { disabled}
        />

        {
          showButton &&
          <Button
              size = { size }
              style={{
                  width: 120,
                  fontSize: '.8rem'
              }}
              onClick={() => setPasswordVisible((prevState) => !prevState)}
              disabled = { disabled }
          >

          { passwordVisible ? 'Cacher' : 'Afficher' }

          </Button>
        }

      </Flex>

    </Space>
  );
};
