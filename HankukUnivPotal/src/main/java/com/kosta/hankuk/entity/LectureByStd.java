package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.kosta.hankuk.dto.LectureByStdDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LectureByStd {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String lbsNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private String grade;
	
	@Column // 드랍여부
	private Boolean isDrop;
	
	public LectureByStdDto toLectureByStdDto() {
		return LectureByStdDto.builder()
				.lbsNo(lbsNo)
				.lecNo(lecture.getLecNo())
				.stdNo(student.getStdNo())
				.grade(grade)
				.isDrop(isDrop)
				.build();
	}
}