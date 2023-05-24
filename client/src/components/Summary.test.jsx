import React from 'react';
import { shallow, mount } from 'enzyme';
import Summary from './Summary';

describe('Summary Component', () => {
  const props = {
    empid: '1',
  };

  it('should render without throwing an error', () => {
    expect(shallow(<Summary {...props} />).exists()).toBe(true);
  });

  it('should initialize the current week state to the current week', () => {
    const wrapper = shallow(<Summary {...props} />);
    const currentWeek = wrapper.find('[data-testid="current-week"]').text();
    expect(currentWeek).toContain('April');
    expect(currentWeek).toContain('th - 15th');
  });

  it('should fetch data when the component mounts', () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    mount(<Summary {...props} />);
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should render a pie chart with data', () => {
    const wrapper = shallow(<Summary {...props} />);
    wrapper.setState({
      data: [
        { projectName: 'Project 1', percentage: 30 },
        { projectName: 'Project 2', percentage: 20 },
        { projectName: 'Project 3', percentage: 15 },
        { projectName: 'Project 4', percentage: 25 },
        { projectName: 'Project 5', percentage: 5 },
        { projectName: 'Project 6', percentage: 5 },
      ],
    });
    const chart = wrapper.find('CanvasJSChart');
    expect(chart.prop('options').data[0].dataPoints).toHaveLength(6);
  });

  it('should handle next week button click correctly', () => {
    const wrapper = shallow(<Summary {...props} />);
    const nextWeekBtn = wrapper.find('[data-testid="next-week-btn"]');
    nextWeekBtn.simulate('click');
    const currentWeek = wrapper.find('[data-testid="current-week"]').text();
    expect(currentWeek).toContain('April');
    expect(currentWeek).toContain('22nd - 29th');
  });

  it('should handle previous week button click correctly', () => {
    const wrapper = shallow(<Summary {...props} />);
    const prevWeekBtn = wrapper.find('[data-testid="prev-week-btn"]');
    prevWeekBtn.simulate('click');
    const currentWeek = wrapper.find('[data-testid="current-week"]').text();
    expect(currentWeek).toContain('March');
    expect(currentWeek).toContain('25th - 1st');
  });
});
