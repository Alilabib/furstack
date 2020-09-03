import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import styles from './styles/job-detail-content-user.module.scss';
import classnames from 'classnames';
import { withNamespaces } from 'react-i18next';

// Assets
import SingleSelect from '~assets/imgs/single-select.svg';
import MultiSelect from '~assets/imgs/multi-select.svg';
import NoAvatar from '~assets/imgs/no-avatar.svg';
import LoadingWrapper from '../common/LoadingWrapper';

class JobDetailContentUser extends Component {
  state = {
    pdfLinks: [],
  };

  handleChangePreviewPdf = (item, status) => {
    const { pdfLinks } = this.state;
    const cpPdfLinks = pdfLinks.slice();
    const findItem = pdfLinks.indexOf(item.url);

    if (status) {
      cpPdfLinks.push(item.url);
    } else {
      cpPdfLinks.splice(findItem, 1);
    }

    this.setState({
      pdfLinks: cpPdfLinks,
    });
  };

  render() {
    const { selected, isLoading, t } = this.props;
    const { pdfLinks } = this.state;
    const user = selected?.user || {};
    const post = selected?.post || {};
    const userAge = moment().diff(moment(user.birthday), 'years');
    if (!selected)
      return (
        <div className={styles.content}>
          <LoadingWrapper isLoading={isLoading}> </LoadingWrapper>
        </div>
      );
    return (
      <div className={styles.content}>
        <LoadingWrapper isLoading={isLoading}>
          <>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src={user.avatar || NoAvatar} alt="avatar" />
              </div>
              <div className={styles.profile_info}>
                <p className={styles.name}>{user.name}</p>
                <p>
                  {user.Nationality?.name['en']}, {user.Governorate?.name['en']}
                </p>
                <p>{userAge} years old</p>
                <p>{user.GraduationStatus?.name['en']}</p>
              </div>
              <div className={styles.basic_filter}>
                <p className={styles.section_title}>
                  {t('job.detail.basic_filter')}
                </p>

                {post.basic_filter_age && (
                  <p>
                    <FontAwesomeIcon icon={['fas', 'check']} />
                    <span
                      className={
                        userAge >= post.basic_filter_age.from &&
                        post.basic_filter_age.from <= post.basic_filter_age.to
                          ? styles.green
                          : styles.red
                      }
                    >{`${post.basic_filter_age.from} - ${post.basic_filter_age.to} years old`}</span>
                  </p>
                )}

                {post.basic_filter_education && (
                  <p>
                    <FontAwesomeIcon icon={['fas', 'check']} />
                    <span
                      className={
                        user.GraduationStatusId >= post.basic_filter_education
                          ? styles.green
                          : styles.red
                      }
                    >{`${user.GraduationStatus.name['en']}`}</span>
                  </p>
                )}

                {post.basic_filter_gender && (
                  <p>
                    <FontAwesomeIcon icon={['fas', 'check']} />
                    <span
                      className={
                        user.gender === post.basic_filter_gender?.value
                          ? styles.green
                          : styles.red
                      }
                    >{`${user.gender}`}</span>
                  </p>
                )}

                {post.basic_filter_natinality && (
                  <p>
                    <FontAwesomeIcon icon={['fas', 'check']} />
                    <span
                      className={
                        post.basic_filter_natinality.indexOf(
                          user.NationalityId
                        ) !== -1
                          ? styles.green
                          : styles.red
                      }
                    >
                      {user.Nationality?.name['en']}
                    </span>
                  </p>
                )}

                {post.basic_filter_university && (
                  <p>
                    <FontAwesomeIcon icon={['fas', 'check']} />
                    <span
                      className={
                        post.basic_filter_university.indexOf(
                          user.UniversityId
                        ) !== -1
                          ? styles.green
                          : styles.red
                      }
                    >
                      {user.Nationality?.name['en']}
                    </span>
                  </p>
                )}
              </div>

              <div className={styles.video_feedback}>
                {!!(user.UserVideoQuizzes && user.UserVideoQuizzes.length) && (
                  <video controls>
                    <source
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <div className={styles.feedback}>
              {selected.evaluation && !!selected.evaluation.length && (
                <div className={styles.section}>
                  <p className={styles.section_title}>
                    {t('job.detail.evaluation')}{' '}
                    <span className={styles.feedback_text}>
                      {t('job.detail.feedback')}
                    </span>
                  </p>
                  {selected.evaluation.map((item) => (
                    <div className={styles.question} key={item.id}>
                      <p className={styles.question_text}>
                        {item.EvaluationQuiz?.question}
                      </p>
                      <div className={styles.answer}>
                        <div className={styles.evaluation_answer}>
                          {[1, 2, 3, 4, 5].map((score) => (
                            <span
                              key={score}
                              className={classnames({
                                [styles.active]:
                                  parseInt(item.choosed_score) === score,
                              })}
                            >
                              {score}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selected.choosingQuiz && !!selected.choosingQuiz.length && (
                <div className={styles.section}>
                  <p className={styles.section_title}>
                    {t('job.detail.checklist')}{' '}
                    <span className={styles.feedback_text}>
                      {t('job.detail.feedback')}
                    </span>
                  </p>

                  {selected.choosingQuiz
                    .filter((item) => item.allow_multiple)
                    .map((q) => (
                      <div className={styles.question} key={q.id}>
                        <p className={styles.question_text}>{q.question}</p>
                        <div className={styles.answer}>
                          <div className={styles.answer_multi}>
                            {q.ChoosingQuizChoices.filter(
                              (item) => item.UserChoosingQuizChoice
                            ).map((selectedOption) => (
                              <div
                                className={styles.select}
                                key={selectedOption.id}
                              >
                                <img src={MultiSelect} alt="" />
                                <span>{selectedOption.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                  {selected.choosingQuiz
                    .filter((item) => !item.allow_multiple)
                    .map((q) => (
                      <div className={styles.question} key={q.id}>
                        <p className={styles.question_text}>{q.question}</p>
                        <div className={styles.answer}>
                          {q.ChoosingQuizChoices.filter(
                            (item) => !!item.UserChoosingQuizChoice
                          ).map((selectedOption) => (
                            <div className={styles.select}>
                              <img src={SingleSelect} alt="" />
                              <span>{selectedOption.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <div className={styles.section}>
                <p className={styles.section_title}>
                  {t('job.detail.cover_letter')}
                </p>
                <div className={styles.cover_letter}>
                  {user.PostUsers[0]?.cover_letter}
                </div>
              </div>
              {/*  */}
            </div>
            <div className={styles.documents}>
              <div className={styles.row_head}>
                <p>{t('job.detail.file_head.preview')}</p>
                <p>{t('job.detail.file_head.attach')}</p>
                <p>{t('job.detail.file_head.download')}</p>
              </div>
              {user.PostUsers[0] &&
                user.PostUsers[0].attachments.map((document, index) => (
                  <div className={styles.row} key={index}>
                    <p>
                      <input
                        type="checkbox"
                        // checked={''}
                        onChange={({ target }) => {
                          this.handleChangePreviewPdf(document, target.checked);
                          console.warn(target.checked);
                        }}
                      />
                    </p>
                    <p>{document.name}</p>
                    <p>
                      <a href={document.url} target="_blank">
                        <FontAwesomeIcon icon={['fas', 'download']} />
                      </a>
                    </p>
                  </div>
                ))}

              {pdfLinks.map((item) => (
                <div style={{ marginBottom: 30, height: '60vh' }}>
                  <iframe
                    src={item}
                    height="100%"
                    width="100%"
                    frameBorder="none"
                    title={item.name}
                  ></iframe>
                </div>
              ))}
            </div>
          </>
        </LoadingWrapper>
      </div>
    );
  }
}

export default withNamespaces()(JobDetailContentUser);
