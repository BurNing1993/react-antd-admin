import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { useStore } from "../../store";

// const usernameReg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
// const passwordReg = /^[a-zA-Z]\w{5,17}$/;

const LoginForm = () => {
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  const {
    userStore: { login },
  } = useStore();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: "Hello",
      password: "World",
    });
  }, []);

  const onFinish = async (loginData: any) => {
    try {
      setLoading(true);
      const msg = await login(loginData);
      message.success(msg);
      history.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: f({ id: "usernameMessage" }) }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={f({ id: "username" })}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: f({ id: "passwordMessage" }) }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={f({ id: "password" })}
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          {f({ id: "login" })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
