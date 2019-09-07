import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { actions } from './store';
import styles from './style.css';
import withStylesHoc from '../../components/withStylesHoc';

const Home = props => {
  useEffect(() => {
    if (!props.newsList.length) {
      props.getList();
    }
  }, []);
  return (
    <div>
      <div>
        {props.newsList.map(item => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  name: state.home.name,
  newsList: state.home.newsList,
});

const mapDispatchToProps = dispatch => ({
  getList() {
    dispatch(actions.getNewsList());
  },
});

Home.loadData = store => {
  return store.dispatch(actions.getNewsList());
};

const ExportHome = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStylesHoc(Home, styles));

ExportHome.loadData = store => {
  return store.dispatch(actions.getNewsList());
};

export default ExportHome;
