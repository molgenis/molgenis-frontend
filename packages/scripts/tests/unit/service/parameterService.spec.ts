import { findParameters } from '@/service/parameterService'

describe('service/parameterService', () => {
    describe('findParameters', () => {
        it('Find non magma parameter', () => {
            expect(findParameters('bla bla bla ${koe} bla bla', 'test')).toEqual(['koe'])
        })
    })

    describe('findParameters', () => {
        it('Find magma parameter', () => {
            expect(findParameters("bla bla bla $('myValue') bla bla", 'JavaScript (Magma)')).toEqual(['myValue'])
        })
    })
})
