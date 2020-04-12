import React, { useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);
    
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    
    const onChangeNick = useCallback((e) => {
        setNick(e.target.value);
    }, []);
    
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);
    
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);
    
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
            <Form 
                onSubmit={onSubmitForm}
                style={{ padding: '10px' }}
                >
                <div>
                    <label htmlFor="user-id">ID</label>
                    <Input 
                        id="user-id" 
                        name="user-id"
                        value={id}
                        required
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    <label htmlFor="user-nick">Nickname</label>
                        <Input 
                            id="user-nick" 
                            name="user-nick"
                            value={nick}
                            required
                            onChange={onChangeNick}
                        />
                </div>
                <div>
                    <label htmlFor="user-password">Password</label>
                            <Input 
                                id="user-password" 
                                name="user-password"
                                type="password"
                                value={password}
                                required
                                onChange={onChangePassword}
                        />
                </div>
                <div>
                    <label htmlFor="user-password-check">Password-Check</label>
                        <Input 
                            id="user-password-check" 
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                        />
                        {passwordError && <div
                                                style={{ color: 'red' }}
                                            >비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox 
                        name="user-term"
                        checked={term}
                        onChange={onChangeTerm}
                    >약관에 동의합니다.</Checkbox>
                    {termError &&  <div 
                                        style={{color: 'red'}}
                                    >약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >가입하기</Button>
                </div>
            </Form>
    );
};

export default Signup;