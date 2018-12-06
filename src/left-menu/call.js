import React, { Component } from 'react';
import '../../../style_css/antd.css';
import { Layout, Icon, Row, Col } from 'antd';
class Index extends Component {
  // 状态机
  constructor(props, context) {
    super(props, context);
    this.state = {
      display_name: 'none' //此状态机为display的取值
    };
  }
  display_name() {
    //编辑按钮的单击事件，修改状态机display_name的取值
    if (this.state.display_name == 'none') {
      this.setState({
        display_name: 'block'
      });
    } else if (this.state.display_name == 'block') {
      this.setState({
        display_name: 'none'
      });
    }
  }
  render() {
    return (
      <Layout>
        {/* 一行：按钮 */}
        <div
          style={{
            background: '#fff',
            paddingTop: '20px',
            display: this.state.display_name
          }}
        >
          {' '}
          {/* 通过状态机display_name获取diaplay取值 */}
          <Row>
            <Col span={12} />
            <Col span={12}>
              <div style={{ float: 'right' }}>
                <span style={{ paddingLeft: '5px' }}>
                  <Button style={buttoncolor} size="large">
                    详情
                  </Button>{' '}
                </span>
                <span style={{ paddingLeft: '5px' }}>
                  <Button style={buttoncolor} size="large">
                    添加
                  </Button>
                </span>
                <span style={{ paddingLeft: '5px' }}>
                  <Button style={buttoncolor} size="large">
                    修改
                  </Button>
                </span>
                <span style={{ paddingLeft: '5px' }}>
                  <Button style={buttoncolor} size="large">
                    删除
                  </Button>
                </span>
                <span style={{ paddingLeft: '5px', paddingRight: '10px' }}>
                  <Button style={buttoncolor} size="large">
                    查看关联
                  </Button>
                </span>
              </div>
            </Col>
          </Row>
        </div>
        {/* 通过icon实现编辑图标 */}
        <div style={{ background: '#fff', paddingTop: '10px' }}>
          <Row>
            <Col span={23} />
            <Col span={1} onClick={this.display_name.bind(this)}>
              {' '}
              {/* 通过display_name函数来改变状态机display_name的值来改变display取值 */}
              <Icon type="edit" style={{ fontSize: '30px' }} />
            </Col>
          </Row>
        </div>
        {/* 页面内容 */}
        <Layout style={{ padding: '10px 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Index;
